# PIERS Fact Finder v2 — Integration Specification Check Please!

**Version:** 1.0
**Date:** 2026-03-18
**Status:** Draft
**Audience:** Frontend (React) and Backend (PIERS API) development teams
**Purpose:** Define the API contract, authentication model, permissions framework, revision workflow, and integration points required to build the new React-based Fact Finder application against the existing PIERS backend.

---

## 1. System Overview

The Fact Finder is a multi-step data collection application used by property investment advisors and their clients. Clients complete a structured form covering personal details, financial position, goals, and property investment preferences. Advisors review, annotate, and finalise submissions. The system generates PDF reports and supports AML/KYC compliance workflows.

### 1.1 Architecture

```
┌─────────────────────────┐       ┌──────────────────────────────────┐
│   React Frontend (SPA)  │◄─────►│        PIERS Backend API         │
│                         │  REST │  (Laravel / existing platform)   │
│  - Form rendering       │       │                                  │
│  - Auto-save (local)    │       │  - Client data persistence       │
│  - Offline draft        │       │  - PDF generation                │
│  - Revision UI          │       │  - Auth / token issuance         │
│                         │       │  - AML/KYC endpoints (new)       │
│                         │       │  - Notification dispatch         │
│                         │       │  - Document storage              │
└─────────────────────────┘       └──────────────────────────────────┘
                                           │
                                  ┌────────┴────────┐
                                  │  External Svc   │
                                  │  - Email (SES)  │
                                  │  - S3 storage   │
                                  │  - Google Maps  │
                                  └─────────────────┘
```

### 1.2 Multi-Tenancy

Multiple advisory firms use the PIERS platform. Every API request is scoped to a tenant (firm). The tenant is determined by the authenticated user's `specialist_id` / firm association. The React app does not need to manage tenancy directly — it is enforced server-side via the authenticated token.

---

## 2. Authentication & Authorization

### 2.1 Current State (v1)

| Aspect | Current Implementation |
|--------|----------------------|
| Client auth | JWT token passed in URL query parameter (`?token=...`) |
| Advisor auth | Same JWT mechanism |
| Token storage | Not stored — extracted from URL on each page load |
| Session management | None |
| CSRF | Not implemented |

### 2.2 Target State (v2)

#### 2.2.1 Client Authentication — Magic Links

| Aspect | Specification |
|--------|--------------|
| Flow | Advisor triggers invite → PIERS sends email with magic link → Client clicks link → Token exchanged for httpOnly session cookie |
| Token lifetime | Magic link valid for **7 days** from issuance |
| Session lifetime | **24 hours** from verification, with sliding expiry on activity |
| Token scope | Scoped to a single `client_id` — client can only access their own record |
| Re-authentication | Client requests new magic link via email (self-service or advisor-triggered) |
| Token format | JWT containing: `sub` (client_id), `tenant_id`, `scope: "client"`, `exp`, `iat` |

#### 2.2.2 Advisor Authentication — Session-Based

| Aspect | Specification |
|--------|--------------|
| Flow | Advisor logs in via PIERS platform → session token issued → passed to Fact Finder app |
| Session lifetime | **8 hours**, with refresh token mechanism |
| Token scope | Scoped to advisor's assigned clients within their tenant |
| Token format | JWT containing: `sub` (user_id), `tenant_id`, `specialist_id`, `scope: "advisor"`, `exp`, `iat` |

#### 2.2.3 Token Handling (React Frontend)

- Tokens MUST be stored in **httpOnly cookies** — never in localStorage, sessionStorage, or URL parameters
- All API requests include the cookie automatically (same-site)
- CSRF token required on all mutating requests (POST, PUT, PATCH, DELETE)
- Frontend reads non-sensitive user context (role, name, client_id) from a `/api/auth/me` endpoint, not by decoding the JWT client-side

#### 2.2.4 Auth API Endpoints

| Method | Endpoint | Auth | Request Body | Response |
|--------|----------|------|-------------|----------|
| `POST` | `/api/auth/magic-link` | Advisor | `{ client_id, email }` | `{ message: "Magic link sent" }` |
| `GET` | `/api/auth/verify/{token}` | Public | — | Sets httpOnly cookie, redirects to form |
| `POST` | `/api/auth/login` | Public | `{ email, password }` | Sets httpOnly cookie, returns `{ user, tenant }` |
| `POST` | `/api/auth/refresh` | Advisor | — | Refreshes session cookie |
| `POST` | `/api/auth/logout` | Any | — | Clears session cookie |
| `GET` | `/api/auth/me` | Any | — | `{ id, role, scope, tenant_id, name }` |

---

## 3. Roles & Permissions

### 3.1 Role Definitions

| Role | Description | Scope |
|------|-------------|-------|
| **Client** | End-user completing the fact find | Own record only |
| **Advisor** | Financial advisor managing clients | Assigned clients within their tenant |
| **Admin** | Firm administrator | All clients and advisors within their tenant |

### 3.2 Permission Matrix

| Action | Client | Advisor | Admin |
|--------|--------|---------|-------|
| View own fact find | Yes | — | — |
| Edit own fact find (when unlocked) | Yes | — | — |
| Submit fact find | Yes | — | — |
| View assigned client's fact find | — | Yes | Yes |
| Edit any section of client's fact find | — | Yes | Yes |
| Add annotations / advisor notes | — | Yes | Yes |
| Lock form (prevent client edits) | — | Yes | Yes |
| Unlock form (allow client revisions) | — | Yes | Yes |
| Generate PDF | — | Yes | Yes |
| View revision history | — | Yes | Yes |
| Send / resend magic link to client | — | Yes | Yes |
| Assign / reassign advisor | — | — | Yes |
| Manage users within tenant | — | — | Yes |
| View audit trail | — | Yes (own clients) | Yes (all) |
| Initiate AML/KYC check | — | Yes | Yes |

### 3.3 Form Edit Permissions by State

| Form State | Client Can Edit | Advisor Can Edit |
|------------|----------------|-----------------|
| DRAFT | Yes | Yes |
| SUBMITTED | No (read-only until unlocked) | Yes |
| IN_REVIEW | No | Yes |
| CLIENT_REVISING | Yes | Read-only (can add notes) |
| LOCKED | No | No (must unlock first) |
| COMPLETED | No | No (archived) |

---

## 4. API Endpoints

### 4.1 Existing PIERS Endpoints (Preserved)

These endpoints exist today and MUST remain backward-compatible. The React app will consume them directly.

#### 4.1.1 Client Data Retrieval

```
GET /api/clients/{clientId}
Authorization: Bearer {token}
Accept: application/json

Response 200:
{
  "data": {
    "id": 7,
    "first_name": "Stephen",
    "last_name": "Ong",
    "middle_name": "John",
    "email": "stephen@example.com",
    "adddress": "2/5-7 Secant St, Liverpool NSW 2170",  // Note: legacy typo preserved
    "city": "Liverpool",
    "state": "NSW",
    "post_code": "2170",
    "phone": null,
    "mobile": "0414444444",
    "birthdate": "1964-02-24",
    "related_id": 8,                    // Partner's client ID
    "user_id": 1,                       // Advisor's user ID
    "specialist_id": 1,
    "employment": "Retina",
    "etype_id": 1,                      // 0 = PAYG, 1 = Self Employed
    "wages": "250000.00",
    "other_income": "0",
    "other_income_description": null,
    "years_employed": "6",
    "status": "NOT PROCEEDING",
    "alerts": "RED",
    "health": "Good",
    "stage_of_life": 2,
    "dependants": 0,

    // Nested collections
    "goals": [{
      "stage": 0,
      "required_amount": 1,
      "required_amount_other": null,
      "purpose": [0, 1],
      "purpose_comment": "",
      "timeframe": 2,
      "contribution": 500,
      "purchase_budget": 750000,
      "risk_profile": 2
    }],

    "assets": [{
      "description": "123 Main St, Sydney",
      "asset_type": "Property",
      "property_type": "Home",
      "value": 1200000,
      "loan_balance": 450000,
      "loan_type": "Variable",
      "interest_rate": 5.5,
      "weekly_rent": 0
    }],

    "other_assets": [{
      "asset_type": "Superannuation",
      "description": "AustralianSuper",
      "asset_name": "Super Fund",
      "value": 350000
    }],

    "liabilities": [{
      "loan_type": 0,                   // 0=Credit Card, 1=Store Card, 2=Loan
      "description": "Visa",
      "value": 15000,                   // Limit
      "balance": 5000,
      "payment_amount": 500
    }],

    "property_fact_finds": [{
      "familiarity_with_markets": 2,
      "expected_capital_growth": 1,
      "wait_time_before_selling": 2,
      "has_type_preferences": "Yes",
      "types_of_investment": "House",
      "investment_preference_comment": "",
      "has_location_preference": "Yes",
      "preferred_states": "NSW",
      "preferred_states_other": null,
      "taxation_importance": 1,
      "familiar_with_gearing": 1
    }],

    // Previously saved form data (if any)
    "form_data": { ... }
  }
}
```

#### 4.1.2 Form Submission / PDF Generation

```
POST /api/generate-pdf
Authorization: Bearer {token}
Accept: application/json
Content-Type: application/json

Request Body:
{
  "client_id": 7,
  "user_id": 1,
  "specialist_id": 1,

  "form_data": {
    "personal": {
      "email": "stephen@example.com",
      "first_name": "Stephen",
      "last_name": "Ong",
      "middle_name": "John",
      "phone": "0414444444",
      "personal_email": "stephen@example.com",
      "address": "2/5-7 Secant St, Liverpool NSW 2170",
      "city": "Liverpool",
      "state": "NSW",
      "postcode": "2170",
      "dependants": 0,
      "income": 250000,                  // Number, not string
      "employment_type": 0,              // 0=PAYG, 1=Self Employed
      "birth_date": "1964",              // Year string
      "stage_of_life": 2,                // Integer 0-4
      "health": "Good"
    },

    "partner": {
      "first_name": "Mary",
      "last_name": "Ong",
      "middle_name": "Anne",
      "phone": "0414444444",
      "phone_1": "0414444444",           // Legacy duplicate field
      "email": "mary@example.com",
      "income": 120000,
      "employment_type": 0,
      "birth_date": "1964",
      "health": "Good"
    },

    "goals": {
      "goals_list": [{
        "goals_q_1_amount_per_week": "1",       // String "0"-"4"
        "goals_q_1_amount_per_week_other": 0,   // Number, used when above = "4"
        "goals_q_2_purpose": [0, 1],            // Array of integers
        "goals_q_2a_comment": "",
        "goals_q_3_time_frame": "2",            // String "0"-"4"
        "goals_q_4_contribution": 500,          // Number
        "goals_q_5_budget": 750000,             // Number
        "goals_q_6_profile": "2"                // String "0"-"4"
      }]
    },

    "finance": {
      "assets_list": [{
        "finance_address": "123 Main St, Sydney",
        "property_type": "Home",                 // "Home" or "Investment"
        "weekly_rent": 0,                        // Number, relevant for Investment
        "finance_value": 1200000,                // Number
        "finance_loan_type": "Variable",         // "Fixed" or "Variable"
        "finance_loan_balance": 450000,          // Number
        "finance_rate": 5.5                      // Number
      }],

      "other_assets_list": [{
        "finance_other_asset_description": "Superannuation",  // Key/type
        "finance_other_asset_description_name": "AustralianSuper",
        "finance_other_asset_amount": 350000,                  // Number
        "finance_other_asset_other_description": null
      }],

      "liabilities_list": [{
        "finance_liability_type": 0,             // 0=CC, 1=Store, 2=Loan
        "finance_liability_description": "Visa",
        "finance_liability_limit": 15000,        // Number
        "finance_liability_balance": 5000,       // Number
        "finance_liability_repayment": 500       // Number
      }]
    },

    "property": {
      "property_list": [{
        "property_q_1_familar": 2,                     // Integer 0-3
        "property_q_2_growth": 1,                      // Integer 0-4
        "property_q_3_wait": 2,                        // Integer 0-3
        "property_q_4_type_preferences": "Yes",        // "Yes" or "No"
        "property_q_4_types_of_investment": "House",   // String
        "property_q_4_investment_preference_comment": "",
        "property_q_5_location_preference": "Yes",     // "Yes" or "No"
        "property_q_5_preference_location_states": "NSW",
        "property_q_5_preference_location_states_other": null,
        "property_q_6_taxation": 1,                    // Integer 0-3
        "property_q_7_gearing": 1                      // Integer 0/1
      }],
      "property_answers": [{
        "applicant_number": 1,
        "property_q_1_familar": 2,
        "property_q_2_growth": 1,
        "property_q_3_wait": 2,
        "property_q_4_type_preferences": "Yes",
        "property_q_4_types_of_investment": "House",
        "property_q_4_investment_preference_comment": "",
        "property_q_5_location_preference": "Yes",
        "property_q_5_preference_location_states": "NSW",
        "property_q_5_preference_location_states_other": null,
        "property_q_6_taxation": 1,
        "property_q_7_gearing": 1
      }]
    },

    "privacy": true,
    "marketing": false
  },

  // Legacy fields (backward compatibility — include these alongside form_data)
  "stage_of_life": 2,
  "personal_income": 250000,
  "partner_income": 120000,
  "personal_birth_date": "1964",
  "partner_middle_name": "Anne",
  "partner_phone_1": "0414444444",
  "property_answers": [{ ... }]         // Same as form_data.property.property_answers
}

Response 200:
{
  "message": "PDF generated successfully",
  "pdf_url": "/storage/clientDocuments/7/factfind_7_2026-03-18.pdf"
}
```

#### 4.1.3 Document Download

```
GET /storage/clientDocuments/{clientId}/{filename}
Authorization: Bearer {token}

Response: Binary PDF file
```

### 4.2 New Endpoints Required

#### 4.2.1 Fact Find Lifecycle & Revision

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/factfind/{clientId}` | Client / Advisor | Get current form state + metadata (status, locked_by, updated_at) |
| `POST` | `/api/factfind/{clientId}` | Client / Advisor | Create initial fact find submission |
| `PUT` | `/api/factfind/{clientId}` | Client / Advisor | Full update of form data (replaces all sections) |
| `PATCH` | `/api/factfind/{clientId}/section/{section}` | Client / Advisor | Partial update — single section only |
| `POST` | `/api/factfind/{clientId}/submit` | Client | Transition status from DRAFT → SUBMITTED |
| `POST` | `/api/factfind/{clientId}/lock` | Advisor | Lock form — prevents client edits |
| `POST` | `/api/factfind/{clientId}/unlock` | Advisor | Unlock form — allows client revision |
| `POST` | `/api/factfind/{clientId}/complete` | Advisor | Mark as completed / finalised |
| `POST` | `/api/factfind/{clientId}/reopen` | Advisor | Reopen a completed fact find |

**Section names for PATCH endpoint:** `personal`, `partner`, `goals`, `finance`, `property`, `consent`

##### GET /api/factfind/{clientId} Response

```json
{
  "data": {
    "client_id": 7,
    "status": "SUBMITTED",
    "locked": false,
    "locked_by": null,
    "locked_at": null,
    "created_at": "2026-03-01T10:00:00Z",
    "updated_at": "2026-03-15T14:30:00Z",
    "submitted_at": "2026-03-15T14:30:00Z",
    "last_edited_by": {
      "id": 7,
      "role": "client",
      "name": "Stephen Ong"
    },
    "advisor": {
      "id": 1,
      "name": "John Moore"
    },
    "form_data": { ... },
    "advisor_notes": [
      {
        "id": 1,
        "section": "finance",
        "field": "assets_list.0.finance_value",
        "note": "Please verify this valuation — seems high for the area",
        "created_by": { "id": 1, "name": "John Moore" },
        "created_at": "2026-03-16T09:00:00Z",
        "resolved": false
      }
    ]
  }
}
```

##### PATCH /api/factfind/{clientId}/section/{section} Request

```json
{
  "section_data": {
    "email": "stephen@example.com",
    "first_name": "Stephen",
    "...": "..."
  }
}
```

#### 4.2.2 Auto-Save (Draft Persistence)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `PUT` | `/api/factfind/{clientId}/draft` | Client / Advisor | Save current form state without submitting |

- Auto-save triggers on field blur or every 30 seconds of inactivity
- Draft saves do NOT change the form status
- Draft saves do NOT trigger notifications
- Response includes a `saved_at` timestamp for the frontend to display "Last saved: ..."
- Conflict resolution: last-write-wins with `updated_at` optimistic locking

```json
// Request
PUT /api/factfind/{clientId}/draft
{
  "form_data": { ... },
  "updated_at": "2026-03-15T14:30:00Z"    // Optimistic lock
}

// Response 200
{
  "saved_at": "2026-03-15T14:31:00Z",
  "status": "DRAFT"
}

// Response 409 (conflict)
{
  "error": "conflict",
  "message": "Form was modified by another user",
  "server_updated_at": "2026-03-15T14:30:45Z",
  "modified_by": { "id": 1, "role": "advisor", "name": "John Moore" }
}
```

#### 4.2.3 Revision History & Audit Trail

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/factfind/{clientId}/history` | Advisor / Admin | Full revision history with field-level diffs |
| `GET` | `/api/factfind/{clientId}/history/{revisionId}` | Advisor / Admin | Single revision detail |

##### GET /api/factfind/{clientId}/history Response

```json
{
  "data": [
    {
      "id": 45,
      "action": "update",
      "status_from": "SUBMITTED",
      "status_to": "SUBMITTED",
      "edited_by": {
        "id": 1,
        "role": "advisor",
        "name": "John Moore"
      },
      "created_at": "2026-03-16T09:15:00Z",
      "changes": [
        {
          "section": "finance",
          "field": "assets_list.0.finance_value",
          "old_value": 1200000,
          "new_value": 1350000,
          "field_label": "Property Value (Asset #1)"
        },
        {
          "section": "personal",
          "field": "income",
          "old_value": 250000,
          "new_value": 265000,
          "field_label": "Annual Income"
        }
      ]
    },
    {
      "id": 44,
      "action": "submit",
      "status_from": "DRAFT",
      "status_to": "SUBMITTED",
      "edited_by": {
        "id": 7,
        "role": "client",
        "name": "Stephen Ong"
      },
      "created_at": "2026-03-15T14:30:00Z",
      "changes": []
    }
  ],
  "meta": {
    "total": 2,
    "page": 1,
    "per_page": 20
  }
}
```

#### 4.2.4 Advisor Notes & Annotations

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/factfind/{clientId}/notes` | Advisor | Add a note to a section/field |
| `PUT` | `/api/factfind/{clientId}/notes/{noteId}` | Advisor | Update a note |
| `DELETE` | `/api/factfind/{clientId}/notes/{noteId}` | Advisor | Delete a note |
| `POST` | `/api/factfind/{clientId}/notes/{noteId}/resolve` | Advisor / Client | Mark a note as resolved |

```json
// POST /api/factfind/{clientId}/notes
{
  "section": "finance",
  "field": "assets_list.0.finance_value",
  "note": "Please verify this valuation"
}
```

#### 4.2.5 Advisor Notifications (In-App)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/notifications` | Advisor | List unread notifications |
| `POST` | `/api/notifications/{id}/read` | Advisor | Mark notification as read |
| `POST` | `/api/notifications/read-all` | Advisor | Mark all as read |

##### Notification Triggers

| Event | Recipient | Message |
|-------|-----------|---------|
| Client submits fact find | Assigned advisor | "{client_name} submitted their fact find" |
| Client revises fact find | Assigned advisor | "{client_name} updated their fact find" |
| Advisor unlocks for revision | Client (via email) | "Your advisor has requested changes to your fact find" |
| AML/KYC check completed | Assigned advisor | "AML check completed for {client_name}" |
| Advisor adds note | Client (via email) | "Your advisor has a question about your fact find" |

##### Notification Payload

```json
{
  "data": [
    {
      "id": 101,
      "type": "factfind.submitted",
      "client_id": 7,
      "client_name": "Stephen Ong",
      "message": "Stephen Ong submitted their fact find",
      "read": false,
      "created_at": "2026-03-15T14:30:00Z",
      "action_url": "/clients/7/factfind"
    }
  ],
  "meta": {
    "unread_count": 3
  }
}
```

#### 4.2.6 Client Management (Advisor)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/clients` | Advisor | List assigned clients with fact find status |
| `GET` | `/api/clients/{clientId}` | Advisor | Client detail (existing endpoint) |
| `POST` | `/api/clients/{clientId}/invite` | Advisor | Send/resend magic link to client |
| `PUT` | `/api/clients/{clientId}/assign` | Admin | Assign/reassign advisor to client |

#### 4.2.7 AML/KYC Endpoints (New)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/clients/{clientId}/aml/check` | Advisor | Initiate AML identity verification |
| `GET` | `/api/clients/{clientId}/aml/status` | Advisor | Get current AML check status |
| `GET` | `/api/clients/{clientId}/aml/history` | Advisor / Admin | Full AML check history |
| `POST` | `/api/clients/{clientId}/aml/documents` | Client / Advisor | Upload ID documents for verification |
| `GET` | `/api/clients/{clientId}/aml/documents` | Advisor | List uploaded ID documents |

##### AML Status Response

```json
{
  "data": {
    "client_id": 7,
    "status": "VERIFIED",           // PENDING, IN_PROGRESS, VERIFIED, FAILED, EXPIRED
    "checked_at": "2026-03-10T11:00:00Z",
    "expires_at": "2028-03-10T11:00:00Z",
    "checks": [
      {
        "type": "identity",
        "status": "PASSED",
        "provider_reference": "abc123",
        "checked_at": "2026-03-10T11:00:00Z"
      },
      {
        "type": "pep_sanctions",
        "status": "CLEAR",
        "checked_at": "2026-03-10T11:00:00Z"
      }
    ],
    "documents": [
      {
        "id": 1,
        "type": "drivers_licence",
        "status": "VERIFIED",
        "uploaded_at": "2026-03-09T15:00:00Z"
      }
    ]
  }
}
```

#### 4.2.8 Document Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/factfind/{clientId}/generate-pdf` | Advisor | Generate PDF (replaces current `/api/generate-pdf`) |
| `GET` | `/api/factfind/{clientId}/documents` | Client / Advisor | List all generated documents |
| `GET` | `/api/factfind/{clientId}/documents/{docId}` | Client / Advisor | Download a specific document |
| `DELETE` | `/api/factfind/{clientId}/documents/{docId}` | Admin | Delete a document |

---

## 5. Revision Workflow

### 5.1 State Machine

```
                          ┌──────────────────────────────────────────┐
                          │                                          │
                          ▼                                          │
┌─────────┐    Client   ┌───────────┐   Advisor    ┌───────────┐   │
│  DRAFT   │──submits──►│ SUBMITTED │──reviews───►│ IN_REVIEW │   │
└─────────┘             └───────────┘              └─────┬─────┘   │
     ▲                                                   │         │
     │                                              ┌────┴────┐    │
     │                                              │         │    │
     │                                    Advisor   │   Advisor│   │
     │                                    unlocks   │   locks  │   │
     │                                              │         │    │
     │                                              ▼         ▼    │
     │                                  ┌────────────┐  ┌────────┐ │
     │                                  │  CLIENT    │  │ LOCKED │ │
     │                                  │  REVISING  │  └───┬────┘ │
     │                                  └─────┬──────┘      │      │
     │                                        │        Advisor     │
     │                                  Client│        completes   │
     │                                  re-submits     │           │
     │                                        │        ▼           │
     │                                        │  ┌───────────┐    │
     │                                        └─►│ COMPLETED │    │
     │                                           └─────┬─────┘    │
     │                                                 │           │
     │                                           Advisor reopens   │
     │                                                 │           │
     └─────────────────────────────────────────────────┘           │
                          Advisor can also reopen to IN_REVIEW─────┘
```

### 5.2 State Transition Rules

| From | To | Triggered By | Side Effects |
|------|----|-------------|-------------|
| (new) | DRAFT | Client opens form / auto-save | — |
| DRAFT | SUBMITTED | Client clicks Submit | Notify advisor |
| SUBMITTED | IN_REVIEW | Advisor opens the fact find | — |
| IN_REVIEW | CLIENT_REVISING | Advisor clicks Unlock | Notify client (email) |
| IN_REVIEW | LOCKED | Advisor clicks Lock | — |
| CLIENT_REVISING | SUBMITTED | Client re-submits | Notify advisor with diff |
| LOCKED | COMPLETED | Advisor clicks Complete | PDF generated, both parties notified |
| COMPLETED | IN_REVIEW | Advisor clicks Reopen | — |

### 5.3 Revision Tracking

Every mutation to `form_data` creates an audit record:

```json
{
  "revision_id": 45,
  "client_id": 7,
  "action": "update",                      // create, update, submit, lock, unlock, complete, reopen
  "actor": {
    "id": 1,
    "role": "advisor",
    "name": "John Moore"
  },
  "status_before": "IN_REVIEW",
  "status_after": "IN_REVIEW",
  "timestamp": "2026-03-16T09:15:00Z",
  "field_changes": [
    {
      "path": "form_data.personal.income",
      "label": "Annual Income",
      "old": 250000,
      "new": 265000
    }
  ]
}
```

- Field-level diffs are computed server-side by comparing the previous `form_data` snapshot with the incoming payload
- Draft auto-saves are recorded but grouped (only the latest draft per session is retained in history)
- The full `form_data` snapshot is stored for each non-draft revision to support point-in-time reconstruction

---

## 6. Data Migration & Backward Compatibility

### 6.1 Requirements

- All existing client records in the current PIERS database must be loadable in the new React app
- The React app must send data in the existing `form_data` structure documented in Section 4.1.2
- Legacy fields at the root level (`stage_of_life`, `personal_income`, `partner_income`, `personal_birth_date`, `partner_middle_name`, `partner_phone_1`, `property_answers`) MUST continue to be sent alongside `form_data` until the backend confirms deprecation

### 6.2 Field Mapping (API Response → React Form)

| API Field (GET response) | Form Field | Transform |
|--------------------------|------------|-----------|
| `wages` | `personal.income` | Parse to number |
| `etype_id` | `personal.employment_type` | Direct (0/1) |
| `adddress` (note typo) | `personal.address` | Direct string |
| `post_code` | `personal.postcode` | Direct string |
| `birthdate` | `personal.birth_date` | Extract year (`"1964-02-24"` → `"1964"`) |
| `mobile` | `personal.phone` | Direct string |
| `related_id` | Partner lookup | Use to fetch/display partner data |
| `goals[].risk_profile` | `goals.goals_list[].goals_q_6_profile` | Integer to string |
| `goals[].timeframe` | `goals.goals_list[].goals_q_3_time_frame` | Integer to string |
| `property_fact_finds[].familiarity_with_markets` | `property.property_list[].property_q_1_familar` | Direct integer |

### 6.3 Known Data Quirks

- `adddress` has a triple-d typo in the database — preserve this field name in API calls
- `google_address` is a composite: `"address,city,state"` — split on comma if used
- Currency values come from the API as strings (`"250000.00"`) but must be sent back as numbers
- `stage_of_life` may arrive as string or integer — always `parseInt()` before use
- Partner data may be in `response.data.partner`, `response.data.related_data`, or require a separate lookup via `related_id`

---

## 7. Integration Points

### 7.1 External Services

| Service | Purpose | Integration Method | New/Existing |
|---------|---------|-------------------|-------------|
| **PIERS Backend API** | Data persistence, business logic | REST API (documented above) | Existing |
| **Email Service** | Magic links, notification emails | Backend-initiated (SES or equivalent) | Existing (extend) |
| **PDF Generation** | Generate fact find reports | Backend endpoint (`/api/factfind/{id}/generate-pdf`) | Existing |
| **Document Storage** | Store PDFs, AML documents | S3 via backend API | Existing (extend for AML) |
| **AML/KYC Provider** | Identity verification, PEP/sanctions screening | Backend integration (TBD — provider selection required) | **New** |
| **Google Maps** | Address autocomplete | Frontend JS API (optional) | Existing (disabled) |

### 7.2 Frontend Integration Points (React App)

| Integration | Method | Notes |
|-------------|--------|-------|
| **PIERS Advisor Dashboard** | Embedded iframe or shared auth session | React app loaded within or alongside the PIERS advisor interface |
| **Client Magic Link** | Standalone URL | Client accesses React app directly via magic link — no PIERS dashboard |
| **Real-time Notifications** | Polling `/api/notifications` every 30s OR WebSocket (future) | Start with polling; migrate to WebSocket if latency becomes an issue |
| **PDF Viewer** | Open generated PDF URL in new tab | Same as current behaviour |
| **Address Autocomplete** | Google Maps Places API (frontend) | Optional — requires API key configuration per tenant |

### 7.3 Environment Configuration

```env
# API
REACT_APP_API_URL=https://piers.forrestercohen.com
REACT_APP_API_TIMEOUT=30000

# Feature Flags
REACT_APP_ENABLE_AML=true
REACT_APP_ENABLE_GOOGLE_MAPS=false
REACT_APP_AUTO_SAVE_INTERVAL=30000      # ms

# Notification Polling
REACT_APP_NOTIFICATION_POLL_INTERVAL=30000  # ms
```

---

## 8. Auto-Save Strategy

### 8.1 Client-Side

1. Store form state in memory (React state) as the source of truth
2. On field blur or after 30 seconds of inactivity, send `PUT /api/factfind/{clientId}/draft`
3. On successful save, update the "Last saved" indicator
4. On network failure, queue the save and retry with exponential backoff (max 3 retries)
5. On page unload (`beforeunload`), attempt a final save via `navigator.sendBeacon` if there are unsaved changes
6. Warn the user via `beforeunload` if there are unsaved changes and navigation is attempted

### 8.2 Conflict Resolution

- Each save includes the `updated_at` timestamp from the last known server state
- If the server's `updated_at` is newer (409 response), show the user a conflict dialog:
  - "This form was updated by {name} at {time}. Do you want to reload their changes or overwrite with yours?"
- For auto-saves specifically, silently reload the server version and re-apply only the fields the current user changed since their last load

---

## 9. Error Handling

### 9.1 API Error Responses

All error responses follow this structure:

```json
{
  "error": "error_code",
  "message": "Human-readable description",
  "errors": {                              // Optional: validation errors
    "form_data.personal.email": ["The email field must be a valid email address."],
    "form_data.finance.assets_list.0.finance_value": ["The value must be a number."]
  }
}
```

### 9.2 HTTP Status Codes

| Code | Meaning | React App Action |
|------|---------|-----------------|
| 200 | Success | Process response |
| 201 | Created | Process response |
| 400 | Validation error | Display field-level errors |
| 401 | Unauthorized / token expired | Redirect to login (advisor) or show "link expired" (client) |
| 403 | Forbidden (wrong role/scope) | Show "You don't have permission" message |
| 404 | Client/factfind not found | Show "Record not found" |
| 409 | Conflict (optimistic lock) | Show conflict resolution dialog |
| 422 | Unprocessable entity | Display validation errors |
| 423 | Form is locked | Show "This form is locked by {advisor}" |
| 429 | Rate limited | Back off and retry |
| 500 | Server error | Show generic error, log to monitoring |

---

## 10. Appendix

### 10.1 Enumerated Values Reference

#### Stage of Life
| Value | Label |
|-------|-------|
| 0 | A single person or couple without children |
| 1 | A single person or couple with young children |
| 2 | A single person or couple with a mature family |
| 3 | A single person or couple preparing for retirement |
| 4 | A retired person or couple |

#### Employment Type
| Value | Label |
|-------|-------|
| 0 | PAYG |
| 1 | Self Employed |

#### Goals — Weekly Retirement Income
| Value | Label |
|-------|-------|
| 0 | $1,000 per week |
| 1 | $1,500 per week |
| 2 | $2,000 per week |
| 3 | $2,500 per week |
| 4 | More (specify amount) |

#### Goals — Purpose
| Value | Label |
|-------|-------|
| 0 | Investment growth |
| 1 | Lump sum on retirement |
| 2 | SMSF investment |
| 3 | Wealth creation |
| 4 | Other (specify) |

#### Goals — Timeframe
| Value | Label |
|-------|-------|
| 0 | Short-term (< 5 years) |
| 1 | 5-10 years |
| 2 | 10-15 years |
| 3 | 15-25 years |
| 4 | 25+ years |

#### Goals — Risk Profile
| Value | Label | Description |
|-------|-------|-------------|
| 0 | Cautious | Security of capital is paramount. Prepared to accept lower returns. |
| 1 | Conservative | Stable, reliable returns with some income focus. Lower volatility tolerance. |
| 2 | Moderate | Balanced approach. Accepts some volatility for growth. |
| 3 | Assertive | Growth investor. Accepts higher volatility and moderate risk. |
| 4 | Aggressive | High growth. Security of capital is secondary to wealth creation. |

#### Property — Market Familiarity
| Value | Label |
|-------|-------|
| 0 | Very little understanding or interest |
| 1 | Understand variables exist but not familiar |
| 2 | Understand basics but unsure of best approach |
| 3 | Experienced investor, understands influencing factors |

#### Property — Expected Capital Growth
| Value | Label |
|-------|-------|
| 0 | 0-3% |
| 1 | 3-5% |
| 2 | 5-7% |
| 3 | 7-10% |
| 4 | 10%+ |

#### Property — Wait Time Before Selling
| Value | Label |
|-------|-------|
| 0 | Less than 1 year |
| 1 | 1-2 years |
| 2 | 2-5 years |
| 3 | 5+ years |

#### Property — Taxation Importance
| Value | Label |
|-------|-------|
| 0 | Not important |
| 1 | Somewhat important |
| 2 | Important |
| 3 | Very important |

#### Property — Investment Types
Values: `House`, `Apt`, `TownHouse`, `DualOcc`, `RoomHouse`

#### Australian States
Values: `NSW`, `QLD`, `VIC`, `WA`, `SA`, `TAS`, `ACT`, `NT`

#### Liability Types
| Value | Label |
|-------|-------|
| 0 | Credit Card |
| 1 | Store Card |
| 2 | Personal Loan |

#### Other Asset Types
Values: `Superannuation`, `Shares`, `Crypto`, `Bonds`, `Managed Funds`, `Cash`, `Other`

#### Health Status
Values: `Fair`, `Average`, `Good`, `Excellent`

#### Form Status
Values: `DRAFT`, `SUBMITTED`, `IN_REVIEW`, `CLIENT_REVISING`, `LOCKED`, `COMPLETED`

#### AML Status
Values: `PENDING`, `IN_PROGRESS`, `VERIFIED`, `FAILED`, `EXPIRED`

### 10.2 Currency Handling

- All currency values are in **AUD**
- API sends currency as numbers (no formatting)
- Display formatting: `Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })`
- Parse incoming strings: strip `$`, `,`, spaces → `parseFloat()`
- Always send numbers to the API, never formatted strings
