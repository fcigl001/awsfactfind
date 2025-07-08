<template>
  <ClientOnly>
  <Vueform
    ref="form$" @submit="handleSubmit"
    size="sm"
  >
    <template #empty>
      <FormSteps>
        <FormStep
          name="page0"
          label="Start"
          :elements="[
            'img',
            'h3',
            'divider_1',
            'h4',
            'html',
            'email',
            'privacy',
            'marketing',
            'divider_2',
          ]"
          :labels="{
            next: 'Personal Information',
          }"
          :buttons="{
            previous: false,
          }"
        />
        <FormStep
          name="page1"
          label="Personal Information"
          :elements="[
            'h2_1',
            'divider_4',
            'personal_address',
            'container3',
            'container2_2',
            'divider_5',
            'h4_2',
            'container2',
            'personal_email',
            'personal_income',
            'personal_employment_type',
            'container2_1',
            'divider_9',
            'h4_5',
            'partner_middle_name',
            'partner_email',
            'partner_income',
            'partner_employment_type',
            'container_1',
          ]"
          :labels="{
            previous: 'Personal Information',
            next: 'Goals',
          }"
        />
        <FormStep
          name="page2"
          label="Goals"
          :elements="[
            'h2',
            'divider_3',
            'goals_question_1a',
            'goals_q_stage_of_life',
            'h4_1',
            'goals_list',
          ]"
          :labels="{
            previous: 'Goals',
            next: 'Finance',
          }"
        />
        <FormStep
          name="page3"
          label="Finance"
          :elements="[
            'h3_1',
            'divider_6',
            'h3_2',
            'finance_assets_list',
            'divider_7',
            'h4_3',
            'finance_other_assets_list',
            'divider_8',
            'h4_4',
            'finance_liabilities_list',
            'text_1',
          ]"
          :labels="{
            previous: 'Finance',
            next: 'Property',
          }"
        />
        <FormStep
          name="page4"
          label="Property"
          :elements="['property', 'divider', 'property_list']"
          :labels="{
            previous: 'Property',
            next: 'Finish',
          }"
        />
        <FormStep
          name="page5"
          label="Finish"
          :elements="[
            'h3_3',
            'h4_6',
            'html_1',
            'specialist_id',
            'user_id',
            'client_id',
            'download',
          ]"
          :labels="{
            previous: 'Property',
            next: 'SUBMIT',
          }"
        />
      </FormSteps>

      <FormElements>
        <StaticElement
          name="property"
          tag="h3"
          content="Property"
          align="center"
          size="md"
        />
        <StaticElement name="divider" tag="hr" />
        <ListElement
          name="property_list"
          add-text="+ Add partner's view (if different)."
          size="sm"
          :min="1"
          :max="2"
        >
          <template #default="{ index }">
            <ObjectElement :name="index">
              <StaticElement
                name="question_1"
                tag="p"
                content="1. How familiar are you with the Residential Property Markets?
"
              />
              <RadiogroupElement
                name="property_q_1_familar"
                view="blocks"
                :items="[
                  {
                    value: 0,
                    label: 'Very little understanding or interest',
                    description: '',
                  },
                  {
                    value: 1,
                    label:
                      'Understand that property market have many variables but are not familiar with them',
                    description: '',
                  },
                  {
                    value: 2,
                    label:
                      'Understand the basics of investment property principals but unsure the best way forward',
                    description: null,
                  },
                  {
                    value: 3,
                    label:
                      'Experienced Investor and understand the various factors that influence performance',
                    description: null,
                  },
                ]"
              />
              <StaticElement
                name="question_2"
                tag="p"
                content="2. What is your expected capital growth per annum over 10 years?
"
              />
              <RadiogroupElement
                name="property_q_2_growth"
                view="tabs"
                :items="[
                  {
                    value: 0,
                    label: '0-3%',
                  },
                  {
                    value: 1,
                    label: '3-5%',
                  },
                  {
                    value: 2,
                    label: '5-7%',
                  },
                  {
                    value: 3,
                    label: '7-10%',
                  },
                  {
                    value: 4,
                    label: '10%+',
                  },
                ]"
              />
              <StaticElement
                name="question_3"
                tag="p"
                content="3. If your property was not growing in value how long would you wait before selling?"
              />
              <RadiogroupElement
                name="property_q_3_wait"
                view="tabs"
                :items="[
                  {
                    value: 0,
                    label: '6 Months',
                  },
                  {
                    value: 1,
                    label: '12 Months',
                  },
                  {
                    value: 2,
                    label: '2 Years',
                  },
                  {
                    value: 3,
                    label: '2+ Years',
                  },
                ]"
              />
              <StaticElement
                name="question_4"
                tag="p"
                content="4. Do you have any preferences for a type/s of investment property?"
                size="sm"
              />
              <RadiogroupElement
                name="property_q-4_type_preferences"
                view="tabs"
                :items="[
                  {
                    value: 'Yes',
                    label: 'Yes',
                  },
                  {
                    value: 'No',
                    label: 'No',
                  },
                ]"
                size="sm"
              />
              <RadiogroupElement
                name="property_q_4_types_of_investment"
                :items="[
                  {
                    value: 'House',
                    label: 'House',
                    description: '',
                  },
                  {
                    value: 'Apartment',
                    label: 'Apartment',
                    description: '',
                  },
                  {
                    value: 'Town House',
                    label: 'Town House',
                    description: null,
                  },
                  {
                    value: 'Dual Occ',
                    label: 'Dual Occupancy',
                    description: null,
                  },
                  {
                    value: 'Room House',
                    label: 'Room House',
                    description: null,
                  },
                ]"
                size="sm"
                view="blocks"
                :conditions="[
                  [
                    'property_list.*.property_q-4_type_preferences',
                    'in',
                    ['Yes'],
                  ],
                ]"
              />
              <TextareaElement
                name="property_q_4_investment_preference_comment"
                label="Other/Comments"
                size="sm"
                :conditions="[
                  [
                    'property_list.*.property_q-4_type_preferences',
                    'in',
                    ['Yes'],
                  ],
                ]"
              />
              <StaticElement
                name="question_5"
                tag="p"
                content="5. Do you have a preference for a location?"
              />
              <RadiogroupElement
                name="property_q_5_location_preference"
                view="tabs"
                :items="[
                  {
                    value: 'Yes',
                    label: 'Yes',
                  },
                  {
                    value: 'No',
                    label: 'No',
                  },
                ]"
              />
              <RadiogroupElement
                name="property_q_5_preference_location_states"
                view="blocks"
                :items="[
                  {
                    value: 'NSW',
                    label: 'NSW',
                    description: '',
                  },
                  {
                    value: 'QLD',
                    label: 'QLD',
                    description: '',
                  },
                  {
                    value: 'VIC',
                    label: 'VIC',
                    description: null,
                  },
                  {
                    value: 'WA',
                    label: 'WA',
                    description: null,
                  },
                  {
                    value: 'SA',
                    label: 'SA',
                    description: null,
                  },
                  {
                    value: 'NT',
                    label: 'NT',
                    description: null,
                  },
                  {
                    value: 'Other',
                    label: 'Other',
                    description: null,
                  },
                ]"
                :conditions="[
                  [
                    'property_list.*.property_q_5_location_preference',
                    'in',
                    ['Yes'],
                  ],
                ]"
              />
              <TextareaElement
                name="property_q_5_preference_location_states_other"
                label="Specify"
                :conditions="[
                  [
                    'property_list.*.property_q_5_preference_location_states',
                    'in',
                    ['Other'],
                  ],
                ]"
              />
              <StaticElement
                name="question_6"
                tag="p"
                content="6. How important are taxation benefits to you?"
              />
              <RadiogroupElement
                name="property_q_6_taxation"
                view="tabs"
                :items="[
                  {
                    value: 0,
                    label: 'Not important',
                  },
                  {
                    value: 1,
                    label: 'Useful',
                  },
                  {
                    value: 2,
                    label: 'Very Important',
                  },
                  {
                    value: 3,
                    label: 'Essential',
                  },
                ]"
              />
              <StaticElement
                name="question_7"
                tag="p"
                content="7. Are you familiar with negative gearing?"
              />
              <RadiogroupElement
                name="property_q_7_gearing"
                view="tabs"
                :items="[
                  {
                    value: 0,
                    label: 'Yes',
                  },
                  {
                    value: 1,
                    label: 'No',
                  },
                ]"
              />
            </ObjectElement>
          </template>
        </ListElement>
        <StaticElement
          name="img"
          tag="img"
          src="https://piers.forrestercohen.com/storage/images/PiersLogo.png"
          width="250"
          href="https://piers.forrestercohen.com"
          target="_blank"
          align="center"
        />
        <StaticElement
          name="h3"
          tag="h2"
          content="Property Risk Fact Find"
          align="center"
        />
        <StaticElement name="divider_1" tag="hr" />
        <StaticElement name="h4" tag="h4" content="Instructions:" />
        <StaticElement
          name="html"
          content="<p>When filling out the fact find form for your property consultation online, please ensure you accurately and thoroughly provide all requested information. Start by entering your personal details, including your full name and contact information.</p>
<br>
<p>For the financial section, upload or input details of your income, bank statements, and any existing assets and liabilities, ensuring the data is current and accurate</p>
<br>

<p>In the property details section, specify the type of property you are interested in, preferred locations, and any specific requirements or features you desire. If the property is for investment, clearly state your investment goals.</p>
<br>
<p>Be sure to carefully review all entered information for accuracy before submitting the form. If you have any questions or encounter any issues while filling out the form, please don't hesitate to contact us for assistance.</p>"
        />
        <TextElement
          name="email"
          input-type="email"
          :rules="['required', 'email']"
          label="Your Email"
          placeholder="your@email.com.au"
          description="Your business email address."
        />
        <CheckboxElement
          name="privacy"
          text="I accept the terms and condition and the privacy statement."
          :default="true"
          :rules="['required', 'accepted']"
        />
        <CheckboxElement
          name="marketing"
          text="I want marketing information."
          :default="true"
          :rules="['nullable']"
        />
        <StaticElement name="divider_2" tag="hr" />
        <StaticElement
          name="h2"
          tag="h3"
          content="Goals

"
          align="center"
          size="sm"
        />
        <StaticElement name="divider_3" tag="hr" />
        <StaticElement
          name="goals_question_1a"
          tag="h4"
          content="What is you stage of life?"
          size="xs"
        />
        <RadiogroupElement
          name="goals_q_stage_of_life"
          :items="[
            {
              value: 0,
              label: 'A single person or couple without children',
              description: null,
            },
            {
              value: 1,
              label: 'A single person or couple with young children',
              description: null,
            },
            {
              value: 2,
              label: 'A single person or couple with a mature family',
              description: null,
            },
            {
              value: 3,
              label: 'A single person or couple preparing for retirement',
              description: null,
            },
            {
              value: 4,
              label: 'A retired person or couple',
              description: null,
            },
          ]"
          view="blocks"
        />
        <StaticElement name="h4_1" tag="h4" content="Applicant #1"  size="xs"/>
        <ListElement
          name="goals_list"
          add-text="+ Add partners's view if different"
        >
          <template #default="{ index }">
            <ObjectElement :name="index">
              <StaticElement
                name="goals_question_1"
                tag="h4"
                content="1. If your property investment is translated into retirement income what would it be per week?"
                size="xs"
              />
              <RadiogroupElement
                name="goals_q_1_amount_per_week"
                view="tabs"
                :items="[
                  {
                    value: 0,
                    label: '$1,000',
                  },
                  {
                    value: 1,
                    label: '$1,500',
                  },
                  {
                    value: 2,
                    label: '$2,000',
                  },
                  {
                    value: 3,
                    label: '$2,500',
                  },
                  {
                    value: 4,
                    label: 'More',
                  },
                ]"
                label="Goal Amount"
              />
              <TextElement
                name="goals_q_1_amount_per_week_other"
                input-type="number"
                autocomplete="off"
                label="How much?"
                :rules="['nullable']"
                :conditions="[
                  ['goals_list.*.goals_q_1_amount_per_week', 'in', [4]],
                ]"
              />
              <StaticElement
                name="goals_question_2"
                tag="h4"
                content="2. Which of the following best describes your purpose for investing?"
                size="xs"
              />
              <CheckboxgroupElement
                name="goals_q_2_purpose"
                view="blocks"
                :items="[
                  {
                    value: 0,
                    label:
                      'You have surplus funds to invest and you are aiming to accumulate wealth',
                    description: '',
                  },
                  {
                    value: 1,
                    label:
                      'You have a lump sum and you wish to invest it in property',
                    description: '',
                  },
                  {
                    value: 2,
                    label: 'You have an SMSF and wish to invest in property',
                    description: null,
                  },
                  {
                    value: 3,
                    label:
                      'You have a specific objective you wish to create additional funds for',
                    description: null,
                  },
                  {
                    value: 4,
                    label:
                      'You want a regular income stream from property investment',
                    description: null,
                  },
                ]"
              />
              <TextareaElement name="goals_q_2a_comment" label="Comment" />
              <StaticElement
                name="goals_question_3"
                tag="h4"
                content="3. How long are you willing to invest to achieve your goal?"
                size="xs"
              />
              <RadiogroupElement
                name="goals_q_3_time_frame"
                view="tabs"
                :items="[
                  {
                    value: 0,
                    label: '5 yrs',
                  },
                  {
                    value: 1,
                    label: '10 yrs',
                  },
                  {
                    value: 2,
                    label: '15 yrs',
                  },
                  {
                    value: 3,
                    label: '20 yrs',
                  },
                  {
                    value: 4,
                    label: '25 yrs',
                  },
                ]"
              />
              <StaticElement
                name="goals_question_4"
                tag="h4"
                content="4. How much per week, are willing to contribute to achieve your goal?"
                size="xs"
              />
              <TextElement
                name="goals_q_4_contribution"
                input-type="number"
                autocomplete="off"
                label="Amount per week"
              />
              <StaticElement
                name="goals_question_5"
                tag="h4"
                content="5. What is the budget for your Property Investment Purchase?"
                size="xs"
              />
              <TextElement
                name="goals_q_5_budget"
                input-type="text"
                :rules="['nullable']"
                autocomplete="off"
                label="Amount budgeted"
                :formatData="formatCurrency"
                :formatLoad="formatCurrency"
                @input="(value) => handleCurrencyInput('goals_q_5_budget', value)"
              />
              <StaticElement
                name="goals_question_6"
                tag="h4"
                content="6. Which of the following describes your Risk Profile?"
                size="xs"
              />
              <RadiogroupElement
                name="goals_q_6_profile"
                view="blocks"
                :items="[
                  {
                    value: 0,
                    label: 'Cautious',
                    description:
                      'When you hear the term RISK you think it means “danger”. When you make a financial decision you focus on the possible losses rather than the possible benefits.\n',
                  },
                  {
                    value: 1,
                    label: 'Conservative',
                    description:
                      'You have a general understanding of investment property markets, but would like to have a broader understanding in order to explore the possibilities. You are prepared to accept moderate level of risk to achieve possible gains.',
                  },
                  {
                    value: 3,
                    label: 'Balanced',
                    description:
                      'You have a reasonable understanding of the property investment market. When you think in terms of risk you think in terms of possibilities. You are a moderate risk taker and can accept some moderate levels of investment risk.',
                  },
                  {
                    value: 4,
                    label: 'Assertive',
                    description:
                      'You are a growth investor and are seeking capital growth. You are prepared to accept higher volatility and moderate risk to achieve your goals.',
                  },
                  {
                    value: 5,
                    label: 'Aggressive',
                    description:
                      'You are a high growth investor prepared to compromise portfolio balance to pursure potentially greater longer term returns. Security of capital is secondary to the potential for wealth creation.',
                  },
                ]"
              />
            </ObjectElement>
          </template>
        </ListElement>
        <StaticElement
          name="h2_1"
          tag="h3"
          content="Personal Information"
          align="center"
        />
        <StaticElement name="divider_4" tag="hr" />
        <TextElement
          name="personal_address"
          label="Address"
          :rules="['required']"
          placeholder="Enter your full address"
        />
        <GroupElement name="container3">
          <GroupElement
            name="column1"
            :columns="{
              container: 6,
            }"
          >
            <TextElement
              name="personal_city"
              label="City"
              :rules="['required']"
              placeholder="Enter city"
            />
          </GroupElement>
          <GroupElement
            name="column2"
            :columns="{
              container: 3,
            }"
          >
            <SelectElement
              name="personal_state"
              :items="[
                {
                  value: 'NSW',
                  label: 'NSW',
                },
                {
                  value: 'QLD',
                  label: 'QLD',
                },
                {
                  value: 'VIC',
                  label: 'VIC',
                },
                {
                  value: 'WA',
                  label: 'WA',
                },
                {
                  value: 'SA',
                  label: 'SA',
                },
                {
                  value: 'TAS',
                  label: 'TAS',
                },
                {
                  value: 'ACT',
                  label: 'ACT',
                },
                {
                  value: 'NT',
                  label: 'NT',
                },
              ]"
              :search="true"
              :native="false"
              label="Select State"
              input-type="search"
              autocomplete="off"
            />
          </GroupElement>
          <GroupElement
            name="column3"
            :columns="{
              container: 3,
            }"
          >
            <TextElement
              name="personal_postcode"
              input-type="number"
              :rules="['nullable', 'numeric']"
              autocomplete="off"
              label="Postcode"
            />
          </GroupElement>
        </GroupElement>
        <GroupElement name="container2_2">
          <GroupElement
            name="column1"
            :columns="{
              container: 6,
            }"
          >
            <TextElement
              name="personal_dependants"
              input-type="number"
              :rules="['nullable', 'numeric']"
              autocomplete="off"
              label="Number of dependants"
            />
          </GroupElement>
          <GroupElement
            name="column2"
            :columns="{
              container: 6,
            }"
          />
        </GroupElement>
        <StaticElement name="divider_5" tag="hr" />
        <StaticElement name="h4_2" tag="h4" content="Person #1 Information" />
        <GroupElement name="container2">
          <GroupElement
            name="column1"
            :columns="{
              container: 6,
            }"
          >
            <TextElement
              name="personal_first_name"
              label="First Name"
              :rules="['required']"
              placeholder="Enter first name"
            />
            <TextElement
              name="personal_last_name"
              label="Last Name"
              :rules="['required']"
              placeholder="Enter last name"
            />
          </GroupElement>
          <GroupElement
            name="column2"
            :columns="{
              container: 6,
            }"
          >
            <TextElement
              name="personal_middle_name"
              label="Middle Name"
              placeholder="Enter middle name (optional)"
            />
            <TextElement
              name="personal_phone_1"
              label="Phone"
              :rules="['required']"
              input-type="tel"
              placeholder="Enter phone number"
            />
          </GroupElement>
        </GroupElement>
        <TextElement
          name="personal_email"
          label="Email"
          input-type="email"
          :rules="['nullable', 'email']"
        />
        <TextElement
          name="personal_income"
          input-type="text"
          :rules="['nullable', 'required']"
          autocomplete="off"
          label="Annual Income"
          :submit="false"
          default="0"
          :formatData="formatCurrency"
          :formatLoad="formatCurrency"
          @input="(value) => handleCurrencyInput('personal_income', value)"
        />
        <RadiogroupElement
          name="personal_employment_type"
          view="tabs"
          :items="[
            {
              value: 0,
              label: 'PAYG',
            },
            {
              value: 1,
              label: 'Self Employed',
            },
          ]"
          label="Type of employment"
        />
        <GroupElement name="container2_1">
          <GroupElement
            name="column1"
            :columns="{
              container: 6,
            }"
          >
            <DateElement
              name="personal_birth_date"
              label="Birth Date"
              display-format="DD/MM/YYYY"
              value-format="DD/MM/YYYY"
              load-format="DD/MM/YYYY"
              :input-type="'text'"
              placeholder="dd/mm/yyyy"
              :rules="['nullable']"
            />
          </GroupElement>
          <GroupElement
            name="column2"
            :columns="{
              container: 6,
            }"
          >
            <SelectElement
              name="personal_health"
              :items="[
                {
                  value: 'Fair',
                  label: 'Fair',
                },
                {
                  value: 'Average',
                  label: 'Average',
                },
                {
                  value: 'Good',
                  label: 'Good',
                },
                {
                  value: 'Excellent',
                  label: 'Excellent',
                },
              ]"
              :search="true"
              :native="false"
              label="Health"
              input-type="search"
              autocomplete="off"
              :submit="false"
            />
          </GroupElement>
        </GroupElement>
        <StaticElement name="divider_9" tag="hr" />
        <StaticElement
          name="h4_5"
          tag="h4"
          content="Partner Information (if joint application)"
        />
        <GroupElement name="partner_middle_name">
          <GroupElement
            name="column1"
            :columns="{
              container: 6,
            }"
          >
            <TextElement name="partner_first_name" label="First Name" />
            <TextElement name="partner_last_name" label="Last Name" />
          </GroupElement>
          <GroupElement
            name="column2"
            :columns="{
              container: 6,
            }"
          >
            <TextElement name="partner_middle_name" label="Middle Name" />
            <TextElement name="partner_phone" label="Phone" />
          </GroupElement>
        </GroupElement>
        <TextElement
          name="partner_email"
          label="Email"
          input-type="email"
          :rules="['nullable', 'email']"
        />
        <TextElement
          name="partner_income"
          input-type="text"
          autocomplete="off"
          label="Annual Income"
          :submit="false"
          default="0"
          :formatData="formatCurrency"
          :formatLoad="formatCurrency"
          @input="(value) => handleCurrencyInput('partner_income', value)"
        />
        <RadiogroupElement
          name="partner_employment_type"
          view="tabs"
          :items="[
            {
              value: 'PAYG',
              label: 'PAYG',
            },
            {
              value: 'Self Employed',
              label: 'Self Employed',
            },
          ]"
          label="Type of Employment"
        />
        <GroupElement name="container_1">
          <GroupElement name="container2">
            <GroupElement
              name="column1"
              :columns="{
                container: 6,
              }"
            >
              <DateElement
                name="partner_birth_date"
                label="Birth Date"
                display-format="DD/MM/YYYY"
                value-format="DD/MM/YYYY"
                load-format="DD/MM/YYYY"
                :input-type="'text'"
                placeholder="dd/mm/yyyy"
              />
            </GroupElement>
            <GroupElement
              name="column2"
              :columns="{
                container: 6,
              }"
            >
              <SelectElement
                name="partner_health"
                :items="[
                  {
                    value: 'Fair',
                    label: 'Fair',
                  },
                  {
                    value: 'Average',
                    label: 'Average',
                  },
                  {
                    value: 'Good',
                    label: 'Good',
                  },
                  {
                    value: 'Excellent',
                    label: 'Excellent',
                  },
                ]"
                :search="true"
                :native="false"
                label="Health"
                input-type="search"
                autocomplete="off"
              />
            </GroupElement>
          </GroupElement>
        </GroupElement>
        <StaticElement name="h3_1" tag="h3" content="Finance" align="center" />
        <StaticElement name="divider_6" tag="hr" />
        <StaticElement
          name="h3_2"
          tag="h4"
          content="Property Assets
"
        />
        <ListElement
          name="finance_assets_list"
          add-text="+ Add more property assets"
        >
          <template #default="{ index }">
            <hr v-if="index > 0" class="green-divider" />
            <ObjectElement :name="index">
              <TextElement
                name="finance_address"
                label="Description and Address"
                info="Add Home and Investment Property Assets here."
                placeholder="Home or Investment property description."
              />
              <GroupElement name="container2">
                <GroupElement
                  name="column1"
                  :columns="{
                    container: 6,
                  }"
                >
                  <TextElement
                    name="finance_value"
                    input-type="text"
                    :rules="['nullable']"
                    autocomplete="off"
                    label="Estimated Value"
                    default="0"
                    :formatData="formatCurrency"
                    :formatLoad="formatCurrency"
                    @input="(value) => handleCurrencyInput('finance_value', value)"
                  />
                  <RadiogroupElement
                    name="finance_loan_type"
                    view="tabs"
                    :items="[
                      {
                        value: 'Fixed',
                        label: 'Fixed',
                      },
                      {
                        value: 'Variable',
                        label: 'Variable',
                      },
                    ]"
                    label="Type of Loan"
                  />
                </GroupElement>
                <GroupElement
                  name="column2"
                  :columns="{
                    container: 6,
                  }"
                >
                  <TextElement
                    name="finance_loan_balance"
                    input-type="text"
                    :rules="['nullable']"
                    autocomplete="off"
                    label="Loan Balance"
                    default="0"
                    :formatData="formatCurrency"
                    :formatLoad="formatCurrency"
                    @input="(value) => handleCurrencyInput('finance_loan_balance', value)"
                  />
                  <TextElement
                    name="finance_rate"
                    input-type="number"
                    :rules="['nullable', 'numeric']"
                    autocomplete="off"
                    label="Loan Rate"
                    :submit="false"
                  />
                </GroupElement>
              </GroupElement>
            </ObjectElement>
          </template>
        </ListElement>
        <StaticElement name="divider_7" tag="hr" />
        <StaticElement name="h4_3" tag="h4" content="Other Assets" />
        <ListElement
          name="finance_other_assets_list"
          add-text="+ Add other assets"
        >
          <template #default="{ index }">
            <hr v-if="index > 0" class="green-divider" />
            <ObjectElement :name="index">
              <GroupElement name="container2">
                <GroupElement
                  name="column1"
                  :columns="{
                    container: 6,
                  }"
                >
                  <SelectElement
                    name="finance_other_asset_description"
                    :items="[
                      {
                        value: 'superannuation',
                        label: 'Superannuation',
                      },
                      {
                        value: 'shares',
                        label: 'Shares',
                      },
                      {
                        value: 'offset',
                        label: 'Offset Account',
                      },
                      {
                        value: 'crypto',
                        label: 'Crypto Currency',
                      },
                      {
                        value: 'managed_funds',
                        label: 'Managed Funds',
                      },
                      {
                        value: 'term_deposits',
                        label: 'Term Deposits',
                      },
                      {
                        value: 'savings_account',
                        label: 'Savings Account',
                      },
                      {
                        value: 'bonds',
                        label: 'Bonds',
                      },
                      {
                        value: 'other',
                        label: 'Other',
                      },
                    ]"
                    :search="true"
                    :native="false"
                    input-type="search"
                    autocomplete="off"
                    label="Type of Asset"
                    placeholder="Select asset type..."
                    :rules="['required']"
                  />
                  <TextElement
                    name="finance_other_asset_other_description"
                    label="Please specify other asset type"
                    placeholder="Enter specific asset type..."
                    :conditions="[
                      [
                        'finance_other_assets_list.*.finance_other_asset_description',
                        'in',
                        ['other'],
                      ],
                    ]"
                  />
                </GroupElement>
                <GroupElement
                  name="column2"
                  :columns="{
                    container: 6,
                  }"
                >
                  <TextElement
                    name="finance_other_asset_description_name"
                    label="Description"
                    :submit="false"
                    placeholder="Enter asset description..."
                  />
                  <TextElement
                    name="finance_other_asset_amount"
                    label="Amount"
                    input-type="text"
                    placeholder="Enter asset value..."
                    :rules="['nullable']"
                    default="0"
                    :formatData="formatCurrency"
                    :formatLoad="formatCurrency"
                    @input="(value) => handleCurrencyInput('finance_other_asset_amount', value)"
                  />
                </GroupElement>
              </GroupElement>
            </ObjectElement>
          </template>
        </ListElement>
        <StaticElement name="divider_8" tag="hr" />
        <StaticElement name="h4_4" tag="h4" content="Liabilities" />
        <ListElement
          name="finance_liabilities_list"
          add-text="+Add other liabilities"
        >
          <template #default="{ index }">
            <hr v-if="index > 0" class="green-divider" />
            <ObjectElement :name="index">
              <GroupElement name="container3">
                <GroupElement
                  name="column1"
                  :columns="{
                    container: 4,
                  }"
                >
                  <SelectElement
                    name="finance_liability_type"
                    :items="[
                      {
                        value: 0,
                        label: 'Credit Card',
                      },
                      {
                        value: 1,
                        label: 'Store Card',
                      },
                      {
                        value: 2,
                        label: 'Loan',
                      },
                    ]"
                    :search="true"
                    :native="false"
                    label="Select"
                    input-type="search"
                    autocomplete="off"
                  />
                </GroupElement>
                <GroupElement
                  name="column2"
                  :columns="{
                    container: 4,
                  }"
                >
                  <TextElement
                    name="finance_liability_limit"
                    input-type="text"
                    :rules="['nullable']"
                    autocomplete="off"
                    label="Limit"
                    :formatData="formatCurrency"
                    :formatLoad="formatCurrency"
                    @input="(value) => handleCurrencyInput('finance_liability_limit', value)"
                  />
                </GroupElement>
                <GroupElement
                  name="column3"
                  :columns="{
                    container: 4,
                  }"
                >
                  <TextElement
                    name="finance_liability_balance"
                    input-type="text"
                    :rules="['nullable']"
                    autocomplete="off"
                    label="Balance Owing"
                    :formatData="formatCurrency"
                    :formatLoad="formatCurrency"
                    @input="(value) => handleCurrencyInput('finance_liability_balance', value)"
                  />
                </GroupElement>
              </GroupElement>
              <GroupElement name="container2">
                <GroupElement
                  name="column1"
                  :columns="{
                    container: 6,
                  }"
                >
                  <TextElement
                    name="finance_liability_description"
                    label="Description"
                  />
                </GroupElement>
                <GroupElement
                  name="column2"
                  :columns="{
                    container: 6,
                  }"
                >
                  <TextElement
                    name="finance_liability_repayment"
                    input-type="text"
                    :rules="['nullable']"
                    autocomplete="off"
                    label="Repayment Per Month"
                    :formatData="formatCurrency"
                    :formatLoad="formatCurrency"
                    @input="(value) => handleCurrencyInput('finance_liability_repayment', value)"
                    :conditions="[
                      [
                        'finance_liabilities_list.*.container3.column1.finance_liability_type',
                        'in',
                        [2],
                      ],
                    ]"
                  />
                </GroupElement>
              </GroupElement>
            </ObjectElement>
          </template>
        </ListElement>
        <StaticElement
          name="h3_3"
          tag="h1"
          content="Great, you have completed your Fact Find, thank you!"
          align="center"
        />
        <StaticElement name="h4_6" tag="h4" content="What happens next?" />
        <StaticElement
          name="html_1"
          content="<p>Once you click 'SUBMIT' a green 'Click here to downnload completed Fact Find' button will appear. Click this button to display a pdf of the completed fact find in a new browser window.</p><br><p> If you wish to may amend any information and Submit it again. An email will be sent to your advisor with a copy of the completed fact find.</p><br>
            <p>Your advisor will contact you once the information has been assessed.      Thank you for your time and we look forward to working with you.</p>"
        />
        <HiddenElement name="specialist_id" />
        <HiddenElement name="user_id" />
        <HiddenElement name="id" />
        <ButtonElement
                v-if="responseMessage"
                name="download"
                button-label="Click here to download completed Fact Find."
                @click="downLoadFF"
              ></ButtonElement>
      </FormElements>

      <FormStepsControls />
    </template>
  </Vueform>
</ClientOnly>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute } from 'vue-router';
const form$ = ref(null);
const prodUrl = "https://piers.forrestercohen.com";
const devUrl = "https://piers.test";
const url = process.env.NODE_ENV === "production" ? prodUrl : devUrl;
const amount = ref(null);
const income = ref(null);
const userIdFromToken = ref(null);
const responseURL = ref(null);
const ok = ref(false);
const tokenFromUrl = ref(null);
var formId = "";
var errorData = "";
var message = "";

const responseMessage = computed(() => {
  console.log(ok.value);
  return ok.value;
});
const downLoadFF = () => {
  try {
    window.open(
      url+"/storage/clientDocuments/" +
        formId +
        "/" +
        responseURL.value,
      "_blank"
    );
    ok.value = false;
    // put the email request here
  } catch (error) {
    console.error("ERROR", error);
  }
};
// testing formating  of partners income
const handleInput = (value) => {
  console.log(value);
  amount.value = value;
  console.log("Amount", amount.value.data);
  return currency(amount.value);
};
const currency = (value) => {
  if (!value) return "";
  const formatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
};

// Enhanced currency formatting for form inputs
const formatCurrency = (value) => {
  if (!value || value === 0) return "";
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  if (isNaN(numValue)) return "";
  
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
  }).format(numValue);
};

// Parse currency string back to number
const parseCurrency = (value) => {
  if (!value) return 0;
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  return isNaN(numValue) ? 0 : numValue;
};

// Handle currency input formatting
const handleCurrencyInput = (fieldName, event) => {
  const value = event.target ? event.target.value : event;
  const numericValue = parseCurrency(value);
  const formattedValue = formatCurrency(numericValue);
  
  // Update the form field with formatted value
  if (form$.value) {
    form$.value.update({
      [fieldName]: formattedValue
    });
  }
};

const handleSubmit = async () => {
  try {
    // Get all form data
    const formData = form$.value.data;
    
    // Process property answers - ensure they're properly structured for FactFindController.php
    const processPropertyAnswers = (propertyList) => {
      if (!propertyList || !Array.isArray(propertyList)) return [];
      
      return propertyList.map((property, index) => ({
        applicant_number: index + 1,
        property_q_1_familar: property.property_q_1_familar ? property.property_q_1_familar.toString() : null,
        property_q_2_growth: property.property_q_2_growth ? property.property_q_2_growth.toString() : null,
        property_q_3_wait: property.property_q_3_wait ? property.property_q_3_wait.toString() : null,
        property_q_4_type_preferences: property['property_q-4_type_preferences'] || null,
        property_q_4_types_of_investment: property.property_q_4_types_of_investment || null,
        property_q_4_investment_preference_comment: property.property_q_4_investment_preference_comment || null,
        property_q_5_location_preference: property.property_q_5_location_preference || null,
        property_q_5_preference_location_states: property.property_q_5_preference_location_states || null,
        property_q_5_preference_location_states_other: property.property_q_5_preference_location_states_other || null,
        property_q_6_taxation: property.property_q_6_taxation ? property.property_q_6_taxation.toString() : null,
        property_q_7_gearing: property.property_q_7_gearing ? property.property_q_7_gearing.toString() : null
      }));
    };
    
    // Process currency fields to ensure they're sent as numbers
    const processCurrencyField = (value) => {
      if (!value) return 0;
      if (typeof value === 'number') return value;
      // Remove currency formatting and convert to number
      const numValue = parseFloat(value.replace(/[^\d.-]/g, ''));
      return isNaN(numValue) ? 0 : numValue;
    };
    
    // Comprehensive data structure for FactFindController.php to save ALL information
    const submitData = {
      // Core identifiers
      client_id: formId,
      user_id: userIdFromToken.value,
      specialist_id: formData.specialist_id || null,
      
      // Complete form data - ensure everything is included
      form_data: {
        // Personal Information Section
        personal: {
          email: formData.email,
          first_name: formData.personal_first_name || null,
          last_name: formData.personal_last_name || null,
          middle_name: formData.personal_middle_name || null,
          phone: formData.personal_phone_1 || null,
          personal_email: formData.personal_email || null,
          address: formData.personal_address || null,
          city: formData.personal_city || null,
          state: formData.personal_state || null,
          postcode: formData.personal_postcode || null,
          dependants: formData.personal_dependants || null,
          income: processCurrencyField(formData.personal_income),
          employment_type: formData.personal_employment_type || null,
          birth_date: formData.personal_birth_date || null,
          health: formData.personal_health || null
        },
        
        // Partner Information Section
        partner: {
          first_name: formData.partner_first_name || null,
          last_name: formData.partner_last_name || null,
          middle_name: formData.partner_middle_name || null,
          phone: formData.partner_phone || null,
          email: formData.partner_email || null,
          income: processCurrencyField(formData.partner_income),
          employment_type: formData.partner_employment_type || null,
          birth_date: formData.partner_birth_date || null,
          health: formData.partner_health || null
        },
        
        // Goals Section
        goals: {
          stage_of_life: (formData.goals_q_stage_of_life || 0).toString(),
          goals_list: formData.goals_list ? formData.goals_list.map(goal => ({
            ...goal,
            // Ensure numeric values are converted to strings where needed
            goals_q_1_amount_per_week: (goal.goals_q_1_amount_per_week || 0).toString(),
            goals_q_3_time_frame: (goal.goals_q_3_time_frame || 0).toString(),
            goals_q_6_profile: (goal.goals_q_6_profile || 0).toString()
          })) : []
        },
        
        // Finance Section
        finance: {
          assets_list: formData.finance_assets_list ? formData.finance_assets_list.map(asset => ({
            ...asset,
            // Handle nested structure for property assets
            finance_value: processCurrencyField(asset.container2?.column1?.finance_value || asset.finance_value),
            finance_loan_balance: processCurrencyField(asset.container2?.column2?.finance_loan_balance || asset.finance_loan_balance),
            finance_loan_type: asset.container2?.column1?.finance_loan_type || asset.finance_loan_type,
            finance_rate: asset.container2?.column2?.finance_rate || asset.finance_rate
          })) : [],
          
          other_assets_list: formData.finance_other_assets_list ? formData.finance_other_assets_list.map(asset => ({
            ...asset,
            finance_other_asset_amount: processCurrencyField(asset.finance_other_asset_amount)
          })) : [],
          
          liabilities_list: formData.finance_liabilities_list ? formData.finance_liabilities_list.map(liability => ({
            ...liability,
            finance_liability_limit: processCurrencyField(liability.finance_liability_limit),
            finance_liability_balance: processCurrencyField(liability.finance_liability_balance),
            finance_liability_repayment: processCurrencyField(liability.finance_liability_repayment)
          })) : []
        },
        
        // Property Section - CRITICAL: Ensure all property answers are saved
        property: {
          property_list: formData.property_list ? formData.property_list.map(property => ({
            ...property,
            // Ensure numeric values are converted to strings
            property_q_1_familar: property.property_q_1_familar ? property.property_q_1_familar.toString() : null,
            property_q_2_growth: property.property_q_2_growth ? property.property_q_2_growth.toString() : null,
            property_q_3_wait: property.property_q_3_wait ? property.property_q_3_wait.toString() : null,
            property_q_6_taxation: property.property_q_6_taxation ? property.property_q_6_taxation.toString() : null,
            property_q_7_gearing: property.property_q_7_gearing ? property.property_q_7_gearing.toString() : null
          })) : [],
          property_answers: processPropertyAnswers(formData.property_list)
        },
        
        // Privacy and Marketing
        privacy: formData.privacy || false,
        marketing: formData.marketing || false
      },
      
      // Legacy format for backward compatibility
      stage_of_life: (formData.goals_q_stage_of_life || 0).toString(),
      property_answers: processPropertyAnswers(formData.property_list),
      personal_income: processCurrencyField(formData.personal_income),
      partner_income: processCurrencyField(formData.partner_income),
      
      // Raw form data for complete backup
      raw_form_data: formData
    };
    
    // === COMPREHENSIVE API DATA MONITOR ===
    console.log("🚀 === API SUBMISSION MONITOR START ===");
    console.log("📊 Raw Form Data:", JSON.stringify(formData, null, 2));
    console.log("📦 Processed Submit Data:", JSON.stringify(submitData, null, 2));
    
    // Monitor specific sections
    console.log("👤 Personal Data:", submitData.form_data.personal);
    console.log("💑 Partner Data:", submitData.form_data.partner);
    console.log("🎯 Goals Data:", submitData.form_data.goals);
    console.log("💰 Finance Data:", {
      assets_count: submitData.form_data.finance.assets_list.length,
      other_assets_count: submitData.form_data.finance.other_assets_list.length,
      liabilities_count: submitData.form_data.finance.liabilities_list.length,
      assets_list: submitData.form_data.finance.assets_list,
      other_assets_list: submitData.form_data.finance.other_assets_list,
      liabilities_list: submitData.form_data.finance.liabilities_list
    });
    console.log("🏠 Property Data:", {
      property_list_count: submitData.form_data.property.property_list.length,
      property_answers_count: submitData.form_data.property.property_answers.length,
      property_list: submitData.form_data.property.property_list,
      property_answers: submitData.form_data.property.property_answers
    });
    
    // Monitor data types for validation-sensitive fields
    console.log("🔍 Data Type Analysis:");
    if (submitData.form_data.goals.goals_list.length > 0) {
      const goal = submitData.form_data.goals.goals_list[0];
      console.log("Goals field types:", {
        goals_q_1_amount_per_week: typeof goal.goals_q_1_amount_per_week,
        goals_q_3_time_frame: typeof goal.goals_q_3_time_frame,
        goals_q_6_profile: typeof goal.goals_q_6_profile
      });
    }
    
    if (submitData.form_data.property.property_list.length > 0) {
      const property = submitData.form_data.property.property_list[0];
      console.log("Property field types:", {
        property_q_1_familar: typeof property.property_q_1_familar,
        property_q_2_growth: typeof property.property_q_2_growth,
        property_q_3_wait: typeof property.property_q_3_wait,
        property_q_6_taxation: typeof property.property_q_6_taxation,
        property_q_7_gearing: typeof property.property_q_7_gearing
      });
    }
    
    // Monitor request details
    console.log("🌐 API Request Details:", {
      url: url + "/api/generate-pdf",
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + tokenFromUrl.value?.substring(0, 20) + '...',
        'Accept': 'application/json'
      },
      data_size: JSON.stringify(submitData).length + ' characters'
    });
    
    console.log("📤 Sending request to API...");
    
    const response = await axios.post(
      url+"/api/generate-pdf",
      submitData,
      {
        headers: {
        'Authorization': 'Bearer ' + tokenFromUrl.value,
        'Accept': 'application/json'
        },
      }
    );
    
    console.log("📥 API Response Received:");
    console.log("✅ Status:", response.status);
    console.log("📋 Response Data:", response.data);
    console.log("📊 Response Headers:", response.headers);
    console.log("🚀 === API SUBMISSION MONITOR END ===");
    message = response.data.message;
    responseURL.value = response.data.url;
    ok.value = true;
  } catch (error) {
    console.log("❌ === API ERROR MONITOR START ===");
    console.error("🚨 ERROR submitting to FactFindController.php:", error);
    
    if (error.response) {
      // Server responded with error status
      console.error("📊 Error Response Status:", error.response.status);
      console.error("📋 Error Response Data:", JSON.stringify(error.response.data, null, 2));
      console.error("📊 Error Response Headers:", error.response.headers);
      
      // Detailed validation error analysis
      if (error.response.data?.errors) {
        console.log("🔍 Validation Errors Analysis:");
        Object.entries(error.response.data.errors).forEach(([field, messages]) => {
          console.error(`❌ Field: ${field}`);
          console.error(`   Messages: ${JSON.stringify(messages)}`);
          
          // Try to find the actual value being sent
          const fieldPath = field.replace('form_data.', '').split('.');
          let value = submitData.form_data;
          try {
            for (const path of fieldPath) {
              if (path.includes('[') && path.includes(']')) {
                // Handle array notation like goals_list[0]
                const [arrayName, indexStr] = path.split('[');
                const index = parseInt(indexStr.replace(']', ''));
                value = value[arrayName][index];
              } else {
                value = value[path];
              }
            }
            console.error(`   Actual value sent: ${JSON.stringify(value)} (type: ${typeof value})`);
          } catch (pathError) {
            console.error(`   Could not trace field path: ${field}`);
          }
        });
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("📡 Network Error - No response received:", error.request);
    } else {
      // Something else happened
      console.error("⚠️ Request Setup Error:", error.message);
    }
    
    console.error("🔧 Error Config:", error.config);
    console.log("❌ === API ERROR MONITOR END ===");
  }
};
const updatePersonalData = (data) => {
  form$.value.update({
    email: data.email,
    personal_first_name: data.first_name,
    personal_last_name: data.last_name,
    personal_middle_name: data.middle_name,
    personal_phone_1: data.mobile,
    personal_income: formatCurrency(parseFloat(data.wages) || 0), // Format as currency
    personal_email: data.email,
    personal_address: data.adddress,
    personal_city: data.city,
    personal_state: data.state,
    personal_postcode: data.post_code,
    personal_dependants: data.dependants,
    personal_health: data.health,
    personal_payg: data.payg,
    personal_self_employed: data.self_employed,
    personal_birth_date: data.birth_date,
    
    // Map employment type based on employment field
    personal_employment_type: data.employment === 'Self Employed' ? 1 : 0,
  });
};
const updateRelatedData = (data) => {
  console.log("Related Data:", data);
  form$.value.update({
    partner_first_name: data.first_name,
    partner_last_name: data.last_name,
    partner_middle_name: data.middle_name,
    partner_phone: data.mobile,
    partner_income: formatCurrency(parseFloat(data.wages) || 0), // Format as currency
    partner_email: data.email,
    partner_address: data.adddress,
    partner_city: data.city,
    partner_state: data.state,
    partner_postcode: data.post_code,
    partner_dependents: data.dependants,
    partner_health: data.health,
    partner_payg: data.payg,
    partner_self_employed: data.self_employed,
    partner_birth_date: data.birth_date,
  });
};
const updateForm = (data) => {
  form$.value.update(data);
};

const updateGoalsData = (data) => {
  if (data.goals && data.goals.length > 0) {
    const goal = data.goals[0]; // Use first goal
    
    // Map risk profile text to form values
    const riskProfileMap = {
      'Cautious': '0',
      'Conservative': '1',
      'Balanced': '3',
      'Assertive': '4',
      'Aggressive': '5',
      'Moderate': '3' // Default moderate to balanced
    };
    
    // Map timeframe text to form values
    const timeframeMap = {
      'Short-term': '0', // 5 yrs
      'Medium-term': '2', // 15 yrs
      'Long-term': '4'   // 25 yrs
    };
    
    // Map purpose to checkbox array
    const mapPurpose = (purpose) => {
      const purposeMap = {
        'Investment': [0], // Surplus funds to accumulate wealth
        'Lump Sum': [1],   // Have lump sum to invest
        'SMSF': [2],       // SMSF investment
        'Specific': [3],   // Specific objective
        'Income': [4]      // Regular income stream
      };
      return purposeMap[purpose] || [0];
    };
    
    // Map weekly amount based on required amount
    const mapWeeklyAmount = (amount) => {
      if (amount <= 1000) return '0'; // $1,000
      if (amount <= 1500) return '1'; // $1,500
      if (amount <= 2000) return '2'; // $2,000
      if (amount <= 2500) return '3'; // $2,500
      return '4'; // More
    };
    
    form$.value.update({
      goals_q_stage_of_life: (goal.stage || 0).toString(),
      goals_list: [{
        goals_q_1_amount_per_week: mapWeeklyAmount(goal.required_amount),
        goals_q_1_amount_per_week_other: goal.required_amount_other || 0,
        goals_q_2_purpose: mapPurpose(goal.purpose),
        goals_q_2a_comment: goal.purpose_comment || '',
        goals_q_3_time_frame: timeframeMap[goal.timeframe] || '2',
        goals_q_4_contribution: goal.contribution || 0,
        goals_q_5_budget: formatCurrency(goal.purchase_budget || 0),
        goals_q_6_profile: riskProfileMap[goal.risk_profile] || '3'
      }]
    });
  }
};

const updateFinanceData = (data) => {
  const financeUpdate = {};
  console.log("Finance Data received from API:", data);
  
  // Initialize empty arrays to ensure proper form structure
  financeUpdate.finance_assets_list = [];
  financeUpdate.finance_other_assets_list = [];
  financeUpdate.finance_liabilities_list = [];
  
  // Check if we have form_data structure (saved form data)
  if (data.form_data && data.form_data.finance) {
    console.log("Found saved form_data.finance:", data.form_data.finance);
    
    // Load saved property assets - ensure they have the correct nested structure
    if (data.form_data.finance.assets_list && data.form_data.finance.assets_list.length > 0) {
      financeUpdate.finance_assets_list = data.form_data.finance.assets_list.map(asset => {
        // If the asset already has the correct nested structure, use it
        if (asset.container2) {
          return asset;
        }
        
        // If it's flat structure, convert to nested
        return {
          finance_address: asset.finance_address,
          container2: {
            column1: {
              finance_value: asset.finance_value,
              finance_loan_type: asset.finance_loan_type
            },
            column2: {
              finance_loan_balance: asset.finance_loan_balance,
              finance_rate: asset.finance_rate
            }
          }
        };
      });
      console.log("Loaded and structured property assets from form_data:", financeUpdate.finance_assets_list);
    }
    
    // Load saved other assets
    if (data.form_data.finance.other_assets_list && data.form_data.finance.other_assets_list.length > 0) {
      financeUpdate.finance_other_assets_list = data.form_data.finance.other_assets_list;
      console.log("Loaded other assets from form_data:", financeUpdate.finance_other_assets_list);
    }
    
    // Load saved liabilities
    if (data.form_data.finance.liabilities_list && data.form_data.finance.liabilities_list.length > 0) {
      financeUpdate.finance_liabilities_list = data.form_data.finance.liabilities_list;
      console.log("Loaded liabilities from form_data:", financeUpdate.finance_liabilities_list);
    }
  }
  
  // If no saved form data, try to process raw API data
  if (financeUpdate.finance_assets_list.length === 0 && financeUpdate.finance_other_assets_list.length === 0 && financeUpdate.finance_liabilities_list.length === 0) {
    console.log("No saved form data found, processing raw API data...");
    
    // Define property asset types that should go in property assets list
    const propertyAssetTypes = [
      'Property', 'Real Estate', 'Home', 'House', 'Apartment', 'Investment Property',
      'Residential Property', 'Commercial Property', 'Land'
    ];
    
    // Handle all assets - separate property from other assets
    if (data.assets && data.assets.length > 0) {
      console.log("Processing assets from API data:", data.assets);
      const propertyAssets = [];
      const otherAssets = [];
      
      data.assets.forEach(asset => {
        const assetType = asset.asset_type || asset.type || '';
        const description = asset.description || '';
        console.log("Processing asset:", asset);
      // Process the other fields like value, id, etc.

        
        // Check if this is a property asset
        const isPropertyAsset = propertyAssetTypes.some(type =>
          assetType.toLowerCase().includes(type.toLowerCase()) ||
          description.toLowerCase().includes(type.toLowerCase())
        ) || (!assetType && description.toLowerCase().includes('property'));
        
        if (isPropertyAsset) {
          console.log("Processing property asset:", asset);
          
          // Extract loan data from multiple possible sources
          let loanBalance = 0;
          let loanType = 'Variable';
          let interestRate = 0;
          
          // Try different field names for loan balance
          if (asset.loan_balance !== undefined && asset.loan_balance !== null) {
            loanBalance = asset.loan_balance;
          } else if (asset.balance !== undefined && asset.balance !== null) {
            loanBalance = asset.balance;
          } else if (asset.finance_loan_balance !== undefined && asset.finance_loan_balance !== null) {
            loanBalance = asset.finance_loan_balance;
          }
          
          // Try different field names for loan type
          if (asset.loan_type) {
            loanType = asset.loan_type;
          } else if (asset.finance_loan_type) {
            loanType = asset.finance_loan_type;
          }
          
          // Try different field names for interest rate
          if (asset.interest_rate !== undefined && asset.interest_rate !== null) {
            interestRate = asset.interest_rate;
          } else if (asset.finance_rate !== undefined && asset.finance_rate !== null) {
            interestRate = asset.finance_rate;
          } else if (asset.rate !== undefined && asset.rate !== null) {
            interestRate = asset.rate;
          }
          
          // If still no loan data, try to find corresponding liability
          if (!loanBalance && !interestRate && data.liabilities && data.liabilities.length > 0) {
            const liability = data.liabilities.find(lib =>
              lib.description === asset.description ||
              lib.asset_id === asset.id ||
              lib.id === asset.liability_id
            );
            
            if (liability) {
              console.log("Found liability for asset:", liability);
              loanBalance = liability.balance || liability.loan_balance || 0;
              loanType = liability.loan_type || 'Variable';
              interestRate = liability.interest_rate || liability.rate || 0;
            }
          }
          
          console.log("Final loan data for property:", {
            loanBalance,
            loanType,
            interestRate,
            description: asset.description
          });
          
          // Debug the individual field processing
          const parsedValue = parseFloat(asset.value) || 0;
          const parsedLoanBalance = parseFloat(loanBalance) || 0;
          const parsedInterestRate = parseFloat(interestRate) || 0;
          
          console.log("Field parsing debug:", {
            originalValue: asset.value,
            parsedValue,
            formattedValue: formatCurrency(parsedValue),
            originalLoanBalance: loanBalance,
            parsedLoanBalance,
            formattedLoanBalance: formatCurrency(parsedLoanBalance),
            originalInterestRate: interestRate,
            parsedInterestRate,
            loanType
          });
          
          // Create the correct nested structure that matches the form template
          const formattedAsset = {
            finance_address: asset.description,
            container2: {
              column1: {
                finance_value: formatCurrency(parsedValue),
                finance_loan_type: loanType?.toString().includes('Fixed') ? 'Fixed' : 'Variable'
              },
              column2: {
                finance_loan_balance: formatCurrency(parsedLoanBalance),
                finance_rate: parsedInterestRate
              }
            }
          };
          
          console.log("Formatted asset for form:", formattedAsset);
          propertyAssets.push(formattedAsset);
        } else {
          // This is an other asset
          const assetTypeMap = {
            'Superannuation': 'superannuation',
            'Shares': 'shares',
            'Offset Account': 'offset',
            'Crypto Currency': 'crypto',
            'Cryptocurrency': 'crypto',
            'Managed Funds': 'managed_funds',
            'Term Deposits': 'term_deposits',
            'Savings Account': 'savings_account',
            'Bank Account': 'savings_account',
            'Cash': 'savings_account',
            'Bonds': 'bonds',
            'Other': 'other'
          };
          
          otherAssets.push({
            finance_other_asset_description: assetTypeMap[assetType] || 'other',
            finance_other_asset_description_name: asset.description || asset.asset_name || '',
            finance_other_asset_amount: formatCurrency(parseFloat(asset.value) || 0),
            finance_other_asset_other_description: assetTypeMap[assetType] === 'other' ? assetType : ''
          });
        }
      });
      
      // Add property assets to the initialized array
      console.log("Property assets identified:", propertyAssets);
      if (propertyAssets.length > 0) {
        financeUpdate.finance_assets_list = [...financeUpdate.finance_assets_list, ...propertyAssets];
      }
      
      // Add other assets from main assets array to the initialized array
      if (otherAssets.length > 0) {
        financeUpdate.finance_other_assets_list = [...financeUpdate.finance_other_assets_list, ...otherAssets];
      }
    }
    
    // Handle dedicated other_assets array if it exists
    if (data.other_assets && data.other_assets.length > 0) {
      const additionalOtherAssets = data.other_assets.map(asset => {
        // Map asset types from API to form values
        const assetTypeMap = {
          'Superannuation': 'superannuation',
          'Shares': 'shares',
          'Offset Account': 'offset',
          'Crypto Currency': 'crypto',
          'Cryptocurrency': 'crypto',
          'Managed Funds': 'managed_funds',
          'Term Deposits': 'term_deposits',
          'Savings Account': 'savings_account',
          'Bank Account': 'savings_account',
          'Cash': 'savings_account',
          'Bonds': 'bonds',
          'Other': 'other'
        };
        
        return {
          finance_other_asset_description: assetTypeMap[asset.asset_type] || 'other',
          finance_other_asset_description_name: asset.description || asset.asset_name || '',
          finance_other_asset_amount: formatCurrency(parseFloat(asset.value) || 0),
          finance_other_asset_other_description: assetTypeMap[asset.asset_type] === 'other' ? asset.asset_type : ''
        };
      });
      
      // Merge with existing other assets (we already initialized the array)
      financeUpdate.finance_other_assets_list = [
        ...financeUpdate.finance_other_assets_list,
        ...additionalOtherAssets
      ];
    }
    
    // Handle liabilities (non-property related)
    if (data.liabilities && data.liabilities.length > 0) {
      const liabilities = data.liabilities.map(liability => {
        // Map loan types
        const loanTypeMap = {
          'Credit Card': 0,
          'Store Card': 1,
          'Home Loan': 2,
          'Personal Loan': 2,
          'Car Loan': 2
        };
        
        return {
          finance_liability_type: loanTypeMap[liability.loan_type] || 2,
          finance_liability_limit: formatCurrency(parseFloat(liability.value) || 0),
          finance_liability_balance: formatCurrency(parseFloat(liability.balance) || 0),
          finance_liability_description: liability.description,
          finance_liability_repayment: formatCurrency(parseFloat(liability.payment_amount) || 0)
        };
      });
      
      financeUpdate.finance_liabilities_list = [...financeUpdate.finance_liabilities_list, ...liabilities];
    }
  }
  
  // Debug logging to see what we're updating
  console.log("Finance update object being sent to form:", financeUpdate);
  if (financeUpdate.finance_assets_list) {
    console.log("Property assets count:", financeUpdate.finance_assets_list.length);
    console.log("Property assets data:", financeUpdate.finance_assets_list);
  }
  if (financeUpdate.finance_other_assets_list) {
    console.log("Other assets count:", financeUpdate.finance_other_assets_list.length);
    console.log("Other assets data:", financeUpdate.finance_other_assets_list);
  }
  if (financeUpdate.finance_liabilities_list) {
    console.log("Liabilities count:", financeUpdate.finance_liabilities_list.length);
    console.log("Liabilities data:", financeUpdate.finance_liabilities_list);
  }
  
  // Ensure we're updating the form correctly
  if (form$.value) {
    console.log("Updating form with finance data...");
    console.log("Data being sent to form:", JSON.stringify(financeUpdate, null, 2));
    
    // Direct update with the finance data
    form$.value.update(financeUpdate);
    
    console.log("=== DEBUGGING FORM UPDATE ===");
    console.log("Finance assets being updated:", financeUpdate.finance_assets_list);
    
    // Force DOM element updates for all property assets
    setTimeout(() => {
      if (financeUpdate.finance_assets_list && financeUpdate.finance_assets_list.length > 0) {
        console.log("🔧 Forcing DOM element updates...");
        
        financeUpdate.finance_assets_list.forEach((asset, index) => {
          if (asset.container2) {
            try {
              // Get the actual DOM elements and set their values directly
              const valueInput = document.getElementById(`finance_assets_list.${index}.container2.column1.finance_value`);
              const loanTypeInputs = document.querySelectorAll(`input[name="finance_assets_list.${index}.container2.column1.finance_loan_type"]`);
              const loanBalanceInput = document.getElementById(`finance_assets_list.${index}.container2.column2.finance_loan_balance`);
              const rateInput = document.getElementById(`finance_assets_list.${index}.container2.column2.finance_rate`);
              
              console.log(`Property ${index + 1} DOM elements:`, {
                valueInput: !!valueInput,
                loanTypeInputs: loanTypeInputs.length,
                loanBalanceInput: !!loanBalanceInput,
                rateInput: !!rateInput
              });
              
              // Set values directly on DOM elements
              if (valueInput && asset.container2.column1.finance_value) {
                valueInput.value = asset.container2.column1.finance_value;
                valueInput.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`✅ Set value for property ${index + 1}: ${asset.container2.column1.finance_value}`);
              }
              
              if (loanBalanceInput && asset.container2.column2.finance_loan_balance) {
                loanBalanceInput.value = asset.container2.column2.finance_loan_balance;
                loanBalanceInput.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`✅ Set loan balance for property ${index + 1}: ${asset.container2.column2.finance_loan_balance}`);
              }
              
              if (rateInput && asset.container2.column2.finance_rate) {
                rateInput.value = asset.container2.column2.finance_rate;
                rateInput.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`✅ Set rate for property ${index + 1}: ${asset.container2.column2.finance_rate}`);
              }
              
              // Handle radio buttons for loan type
              if (loanTypeInputs.length > 0 && asset.container2.column1.finance_loan_type) {
                loanTypeInputs.forEach(input => {
                  if (input.value === asset.container2.column1.finance_loan_type) {
                    input.checked = true;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    console.log(`✅ Set loan type for property ${index + 1}: ${asset.container2.column1.finance_loan_type}`);
                  }
                });
              }
              
            } catch (error) {
              console.error(`❌ Error updating DOM for property ${index + 1}:`, error);
            }
          }
        });
      }
      
      // Force DOM element updates for other assets
      if (financeUpdate.finance_other_assets_list && financeUpdate.finance_other_assets_list.length > 0) {
        console.log("🔧 Forcing DOM element updates for other assets...");
        
        financeUpdate.finance_other_assets_list.forEach((asset, index) => {
          try {
            // Get the actual DOM elements and set their values directly
            const typeSelect = document.getElementById(`finance_other_assets_list.${index}.container2.column1.finance_other_asset_description`);
            const descriptionInput = document.getElementById(`finance_other_assets_list.${index}.container2.column2.finance_other_asset_description_name`);
            const amountInput = document.getElementById(`finance_other_assets_list.${index}.container2.column2.finance_other_asset_amount`);
            const otherDescInput = document.getElementById(`finance_other_assets_list.${index}.container2.column1.finance_other_asset_other_description`);
            
            console.log(`Other Asset ${index + 1} DOM elements:`, {
              typeSelect: !!typeSelect,
              descriptionInput: !!descriptionInput,
              amountInput: !!amountInput,
              otherDescInput: !!otherDescInput
            });
            
            // Debug the select element structure
            if (typeSelect) {
              console.log(`🔍 Other Asset ${index + 1} Select Element Debug:`, {
                tagName: typeSelect.tagName,
                type: typeSelect.type,
                value: typeSelect.value,
                innerHTML: typeSelect.innerHTML.substring(0, 200) + '...',
                classList: Array.from(typeSelect.classList),
                parentElement: typeSelect.parentElement?.tagName
              });
            }
            
            // Try multiple approaches for select elements
            if (typeSelect && asset.finance_other_asset_description) {
              console.log(`🎯 Attempting to set other asset ${index + 1} type to: ${asset.finance_other_asset_description}`);
              
              // Approach 1: Direct value setting
              typeSelect.value = asset.finance_other_asset_description;
              typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
              typeSelect.dispatchEvent(new Event('input', { bubbles: true }));
              
              // Approach 2: Find and select option
              const options = typeSelect.querySelectorAll('option');
              console.log(`Available options for other asset ${index + 1}:`, Array.from(options).map(opt => ({ value: opt.value, text: opt.textContent })));
              
              let optionFound = false;
              options.forEach(option => {
                if (option.value === asset.finance_other_asset_description) {
                  option.selected = true;
                  optionFound = true;
                  console.log(`✅ Found and selected option: ${option.value}`);
                }
              });
              
              // Approach 3: Try using Vueform API if available
              try {
                const formElement = form$.value?.el$(`finance_other_assets_list.${index}.container2.column1.finance_other_asset_description`);
                if (formElement) {
                  console.log(`🔧 Using Vueform API for other asset ${index + 1}`);
                  formElement.update(asset.finance_other_asset_description);
                  console.log(`✅ Updated via Vueform API: ${asset.finance_other_asset_description}`);
                }
              } catch (vueformError) {
                console.log(`⚠️ Vueform API approach failed for other asset ${index + 1}:`, vueformError.message);
              }
              
              // Verify the final value
              setTimeout(() => {
                console.log(`🔍 Final verification for other asset ${index + 1}: ${typeSelect.value}`);
              }, 100);
              
              console.log(`✅ Set type for other asset ${index + 1}: ${asset.finance_other_asset_description} (found option: ${optionFound})`);
            }
            
            // Approach 4: Delayed retry for Vueform reactivity
            setTimeout(() => {
              if (typeSelect && asset.finance_other_asset_description && typeSelect.value !== asset.finance_other_asset_description) {
                console.log(`🔄 Retrying other asset ${index + 1} type selection after delay...`);
                typeSelect.value = asset.finance_other_asset_description;
                typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
                typeSelect.dispatchEvent(new Event('input', { bubbles: true }));
                
                // Force focus and blur to trigger Vueform validation
                typeSelect.focus();
                typeSelect.blur();
                
                console.log(`🔄 Retry result for other asset ${index + 1}: ${typeSelect.value}`);
              }
            }, 200);
            
            if (descriptionInput && asset.finance_other_asset_description_name) {
              descriptionInput.value = asset.finance_other_asset_description_name;
              descriptionInput.dispatchEvent(new Event('input', { bubbles: true }));
              console.log(`✅ Set description for other asset ${index + 1}: ${asset.finance_other_asset_description_name}`);
            }
            
            if (amountInput && asset.finance_other_asset_amount) {
              amountInput.value = asset.finance_other_asset_amount;
              amountInput.dispatchEvent(new Event('input', { bubbles: true }));
              console.log(`✅ Set amount for other asset ${index + 1}: ${asset.finance_other_asset_amount}`);
            }
            
            if (otherDescInput && asset.finance_other_asset_other_description) {
              otherDescInput.value = asset.finance_other_asset_other_description;
              otherDescInput.dispatchEvent(new Event('input', { bubbles: true }));
              console.log(`✅ Set other description for other asset ${index + 1}: ${asset.finance_other_asset_other_description}`);
            }
            
          } catch (error) {
            console.error(`❌ Error updating DOM for other asset ${index + 1}:`, error);
          }
        });
      }
      
      // Force DOM element updates for liabilities
      if (financeUpdate.finance_liabilities_list && financeUpdate.finance_liabilities_list.length > 0) {
        console.log("🔧 Forcing DOM element updates for liabilities...");
        
        financeUpdate.finance_liabilities_list.forEach((liability, index) => {
          try {
            // Get the actual DOM elements and set their values directly
            const typeSelect = document.getElementById(`finance_liabilities_list.${index}.container3.column1.finance_liability_type`);
            const limitInput = document.getElementById(`finance_liabilities_list.${index}.container3.column2.finance_liability_limit`);
            const balanceInput = document.getElementById(`finance_liabilities_list.${index}.container3.column3.finance_liability_balance`);
            const descriptionInput = document.getElementById(`finance_liabilities_list.${index}.container2.column1.finance_liability_description`);
            const repaymentInput = document.getElementById(`finance_liabilities_list.${index}.container2.column2.finance_liability_repayment`);
            
            console.log(`Liability ${index + 1} DOM elements:`, {
              typeSelect: !!typeSelect,
              limitInput: !!limitInput,
              balanceInput: !!balanceInput,
              descriptionInput: !!descriptionInput,
              repaymentInput: !!repaymentInput
            });
            
            // Set values directly on DOM elements - Special handling for select elements
            if (typeSelect && liability.finance_liability_type !== undefined) {
              // For select elements, we need to ensure the option exists and is selected
              const options = typeSelect.querySelectorAll('option');
              let optionFound = false;
              
              options.forEach(option => {
                if (option.value == liability.finance_liability_type) { // Use == for type coercion
                  option.selected = true;
                  optionFound = true;
                }
              });
              
              if (optionFound) {
                typeSelect.value = liability.finance_liability_type;
                typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
                typeSelect.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`✅ Set type for liability ${index + 1}: ${liability.finance_liability_type}`);
              } else {
                console.warn(`⚠️ Option not found for liability ${index + 1}: ${liability.finance_liability_type}`);
                console.log('Available options:', Array.from(options).map(opt => opt.value));
              }
            }
            
            if (limitInput && liability.finance_liability_limit) {
              limitInput.value = liability.finance_liability_limit;
              limitInput.dispatchEvent(new Event('input', { bubbles: true }));
              console.log(`✅ Set limit for liability ${index + 1}: ${liability.finance_liability_limit}`);
            }
            
            if (balanceInput && liability.finance_liability_balance) {
              balanceInput.value = liability.finance_liability_balance;
              balanceInput.dispatchEvent(new Event('input', { bubbles: true }));
              console.log(`✅ Set balance for liability ${index + 1}: ${liability.finance_liability_balance}`);
            }
            
            if (descriptionInput && liability.finance_liability_description) {
              descriptionInput.value = liability.finance_liability_description;
              descriptionInput.dispatchEvent(new Event('input', { bubbles: true }));
              console.log(`✅ Set description for liability ${index + 1}: ${liability.finance_liability_description}`);
            }
            
            if (repaymentInput && liability.finance_liability_repayment) {
              repaymentInput.value = liability.finance_liability_repayment;
              repaymentInput.dispatchEvent(new Event('input', { bubbles: true }));
              console.log(`✅ Set repayment for liability ${index + 1}: ${liability.finance_liability_repayment}`);
            }
            
          } catch (error) {
            console.error(`❌ Error updating DOM for liability ${index + 1}:`, error);
          }
        });
      }
    }, 800);
    
    // Verification after update
    setTimeout(() => {
      const currentData = form$.value.data;
      console.log("=== FORM DATA VERIFICATION ===");
      console.log("Property assets count:", currentData.finance_assets_list?.length || 0);
      
      // Check if the form fields are actually populated
      if (currentData.finance_assets_list && currentData.finance_assets_list.length > 0) {
        currentData.finance_assets_list.forEach((asset, index) => {
          console.log(`\n--- Property Asset ${index + 1} ---`);
          console.log("Address/Description:", asset.finance_address);
          console.log("Nested Structure Check:");
          console.log("  - Value:", asset.container2?.column1?.finance_value);
          console.log("  - Loan Type:", asset.container2?.column1?.finance_loan_type);
          console.log("  - Loan Balance:", asset.container2?.column2?.finance_loan_balance);
          console.log("  - Interest Rate:", asset.container2?.column2?.finance_rate);
          
          // Verify the structure is correct
          if (!asset.container2?.column1?.finance_value && index > 0) {
            console.warn(`⚠️  Property ${index + 1} missing nested structure data!`);
            console.log("Raw asset structure:", JSON.stringify(asset, null, 2));
          } else {
            console.log(`✅ Property ${index + 1} structure looks correct`);
          }
        });
      }
      
      console.log("\nOther assets count:", currentData.finance_other_assets_list?.length || 0);
      console.log("Liabilities count:", currentData.finance_liabilities_list?.length || 0);
      console.log("=== END VERIFICATION ===\n");
      
      // Additional debugging: Check if form elements exist
      try {
        const listElement = form$.value.el$('finance_assets_list');
        console.log("Finance assets list element exists:", !!listElement);
        if (listElement) {
          console.log("List element type:", listElement.type);
          console.log("List element children type:", typeof listElement.children$);
          
          if (listElement.children$ && Array.isArray(listElement.children$)) {
            console.log("List children count:", listElement.children$.length);
          } else if (listElement.children$ && typeof listElement.children$ === 'object') {
            console.log("List children (object):", Object.keys(listElement.children$));
          }
        }
      } catch (error) {
        console.error("Error accessing form elements:", error);
      }
    }, 500);
  }
};

const updatePropertyData = (data) => {
  // Check if property data exists in the API response - look for property_fact_finds array
  if (data.property_fact_finds && data.property_fact_finds.length > 0) {
    
    // Map API field names to form field names
    const mapLocationPreference = (hasPreference) => {
      return hasPreference ? 'Yes' : 'No';
    };
    
    const mapTypePreferences = (hasPreferences) => {
      return hasPreferences ? 'Yes' : 'No';
    };
    
    const mapGearing = (familiarWithGearing) => {
      return familiarWithGearing ? 0 : 1; // 0 = Yes, 1 = No based on form options
    };
    
    // Map each property fact find to form structure
    const mapPropertyFactFind = (propertyFactFind) => ({
      property_q_1_familar: propertyFactFind.familiarity_with_markets?.toString() || null,
      property_q_2_growth: propertyFactFind.expected_capital_growth?.toString() || null,
      property_q_3_wait: propertyFactFind.wait_time_before_selling?.toString() || null,
      'property_q-4_type_preferences': mapTypePreferences(propertyFactFind.has_type_preferences),
      property_q_4_types_of_investment: propertyFactFind.types_of_investment || null,
      property_q_4_investment_preference_comment: propertyFactFind.investment_preference_comment || null,
      property_q_5_location_preference: mapLocationPreference(propertyFactFind.has_location_preference),
      property_q_5_preference_location_states: propertyFactFind.preferred_states || null,
      property_q_5_preference_location_states_other: propertyFactFind.preferred_states_other || null,
      property_q_6_taxation: propertyFactFind.taxation_importance?.toString() || null,
      property_q_7_gearing: mapGearing(propertyFactFind.familiar_with_gearing)
    });
    
    // Handle both applicant and partner property data
    const propertyList = data.property_fact_finds.map(propertyFactFind =>
      mapPropertyFactFind(propertyFactFind)
    );
    
    const propertyUpdate = {
      property_list: propertyList
    };
    
    form$.value.update(propertyUpdate);
    console.log("Property data updated from property_fact_finds:", propertyUpdate);
    console.log(`Updated ${propertyList.length} property entries (applicant${propertyList.length > 1 ? ' and partner' : ''})`);
  } else {
    console.log("No property_fact_finds data found in API response");
  }
};

onMounted(async () => {
 const url = new URL(window.location.href)
 const clientId = url.searchParams.get('clientId');
const token = url.searchParams.get('token')
tokenFromUrl.value = token || url.hash.split('token=')[1];
  console.log("Token from URL:", tokenFromUrl.value);
  if (!tokenFromUrl.value) {
    console.error("No token found in URL");
    errorData = "Missing required URL parameter: token";
    return;
  }
  try {
    // Decode JWT payload (base64 decode the middle part)
    const tokenParts = tokenFromUrl.value.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid JWT token format');
    }
    
    const payload = JSON.parse(atob(tokenParts[1]));
    userIdFromToken.value = parseInt(payload.sub, 10); // Convert to integer
    console.log("Decoded JWT payload:", payload);
    console.log("User ID from token:", userIdFromToken.value);
    
    // Use the user ID from token if clientId from URL is not available
    if (!clientId && userIdFromToken.value) {
      clientId = userIdFromToken.value;
    }
    
    if (!clientId) {
      throw new Error('No client ID found in token');
    }
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    errorData = "Invalid token format";
    return;
  }

  var pathName = window.location.pathname;
  var segments = pathName.split("/");
  var lastSegment = segments.pop() || segments.pop(); // handle potential trailing slash
  console.log(url);
  const baseUrl = `${url}/api/clients/${clientId}?token=${tokenFromUrl.value}`;
  
  //const baseUrl = "http://localhost:3000/clients.json";
  console.log("BASE URL", tokenFromUrl.value, clientId, baseUrl)
  formId = clientId; // Use client_id from JWT token
  try {
    console.log("Making API request to:", baseUrl);
   const response = await axios.get(`${url}/api/clients/${clientId}`, {
      headers: {
        'Authorization': 'Bearer ' + tokenFromUrl.value,
        'Accept': 'application/json'
      }
    });
    console.log("API Response:", response.data.data);
    const remoteData = response.data.data;
    const relatedId = remoteData.related_id;
    
    // Update all form sections with the API data
    console.log("Full API response data:", remoteData);
    console.log("Property fact finds in response:", remoteData.property_fact_finds);
    
    updateForm(remoteData);
    updatePersonalData(remoteData);
    updateGoalsData(remoteData);
    updateFinanceData(remoteData);
    updatePropertyData(remoteData);
    
    // Check if partner data is included in the main response
    if (remoteData.partner || remoteData.related_data) {
      console.log("Partner data found in main response:", remoteData.partner || remoteData.related_data);
      updateRelatedData(remoteData.partner || remoteData.related_data);
    } else if (relatedId) {
      console.log("No partner data in main response, related_id found:", relatedId);
      // Partner data might be in a separate structure - check for it
      console.log("Looking for partner data in response structure...");
    }
  } catch (error) {
    console.error("Full error object:", error);
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
      errorData = error.response.data.message || error.response.data;
    } else {
      console.error("Network error:", error.message);
      errorData = error.message;
    }
    console.error("Error fetching data:", errorData);
  }
});
</script>
<style>
.p {
  font-style: "source-sans-pro, sans-serif";
  font-size: 20px !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.vf-fact-find *,
.vf-fact-find *:before,
.vf-fact-find *:after,
.vf-fact-find:root {
  --vf-primary: #07bf9b;
  --vf-primary-darker: #06ac8b;
  --vf-color-on-primary: #ffffff;
  --vf-danger: #ef4444;
  --vf-danger-lighter: #fee2e2;
  --vf-success: #10b981;
  --vf-success-lighter: #d1fae5;
  --vf-gray-50: #f9fafb;
  --vf-gray-100: #f3f4f6;
  --vf-gray-200: #e5e7eb;
  --vf-gray-300: #d1d5db;
  --vf-gray-400: #9ca3af;
  --vf-gray-500: #6b7280;
  --vf-gray-600: #4b5563;
  --vf-gray-700: #374151;
  --vf-gray-800: #1f2937;
  --vf-gray-900: #111827;
  --vf-ring-width: 2px;
  --vf-ring-color: #07bf9b66;
  --vf-link-color: var(--vf-primary);
  --vf-link-decoration: inherit;

  --vf-font-size: 1rem;
  --vf-font-size-sm: 0.875rem;
  --vf-font-size-lg: 1rem;
  --vf-font-size-small: 0.875rem;
  --vf-font-size-small-sm: 0.8125rem;
  --vf-font-size-small-lg: 0.875rem;
  --vf-font-size-h1: 2.125rem;
  --vf-font-size-h1-sm: 2.125rem;
  --vf-font-size-h1-lg: 2.125rem;
  --vf-font-size-h2: 1.875rem;
  --vf-font-size-h2-sm: 1.875rem;
  --vf-font-size-h2-lg: 1.875rem;
  --vf-font-size-h3: 1.5rem;
  --vf-font-size-h3-sm: 1.5rem;
  --vf-font-size-h3-lg: 1.5rem;
  --vf-font-size-h4: 1.00rem;
  --vf-font-size-h4-sm: 1.00rem;
  --vf-font-size-h4-lg: 1.25rem;
  --vf-font-size-h1-mobile: 1.5rem;
  --vf-font-size-h1-mobile-sm: 1.5rem;
  --vf-font-size-h1-mobile-lg: 1.5rem;
  --vf-font-size-h2-mobile: 1.25rem;
  --vf-font-size-h2-mobile-sm: 1.25rem;
  --vf-font-size-h2-mobile-lg: 1.25rem;
  --vf-font-size-h3-mobile: 1.125rem;
  --vf-font-size-h3-mobile-sm: 1.125rem;
  --vf-font-size-h3-mobile-lg: 1.125rem;
  --vf-font-size-h4-mobile: 1rem;
  --vf-font-size-h4-mobile-sm: 1rem;
  --vf-font-size-h4-mobile-lg: 1rem;
  --vf-font-size-blockquote: 1rem;
  --vf-font-size-blockquote-sm: 0.875rem;
  --vf-font-size-blockquote-lg: 1rem;
  --vf-line-height: 1.5rem;
  --vf-line-height-sm: 1.25rem;
  --vf-line-height-lg: 1.5rem;
  --vf-line-height-small: 1.25rem;
  --vf-line-height-small-sm: 1.125rem;
  --vf-line-height-small-lg: 1.25rem;
  --vf-line-height-headings: 1.2;
  --vf-line-height-headings-sm: 1.2;
  --vf-line-height-headings-lg: 1.2;
  --vf-line-height-blockquote: 1.5rem;
  --vf-line-height-blockquote-sm: 1.25rem;
  --vf-line-height-blockquote-lg: 1.5rem;
  --vf-letter-spacing: 0px;
  --vf-letter-spacing-sm: 0px;
  --vf-letter-spacing-lg: 0px;
  --vf-letter-spacing-small: 0px;
  --vf-letter-spacing-small-sm: 0px;
  --vf-letter-spacing-small-lg: 0px;
  --vf-letter-spacing-headings: 0px;
  --vf-letter-spacing-headings-sm: 0px;
  --vf-letter-spacing-headings-lg: 0px;
  --vf-letter-spacing-blockquote: 0px;
  --vf-letter-spacing-blockquote-sm: 0px;
  --vf-letter-spacing-blockquote-lg: 0px;
  --vf-gutter: 1rem;
  --vf-gutter-sm: 0.5rem;
  --vf-gutter-lg: 1rem;
  --vf-min-height-input: 2.375rem;
  --vf-min-height-input-sm: 2.125rem;
  --vf-min-height-input-lg: 2.875rem;
  --vf-py-input: 0.375rem;
  --vf-py-input-sm: 0.375rem;
  --vf-py-input-lg: 0.625rem;
  --vf-px-input: 0.75rem;
  --vf-px-input-sm: 0.5rem;
  --vf-px-input-lg: 0.875rem;
  --vf-py-btn: 0.375rem;
  --vf-py-btn-sm: 0.375rem;
  --vf-py-btn-lg: 0.625rem;
  --vf-px-btn: 0.875rem;
  --vf-px-btn-sm: 0.75rem;
  --vf-px-btn-lg: 1.25rem;
  --vf-py-btn-small: 0.25rem;
  --vf-py-btn-small-sm: 0.25rem;
  --vf-py-btn-small-lg: 0.375rem;
  --vf-px-btn-small: 0.625rem;
  --vf-px-btn-small-sm: 0.625rem;
  --vf-px-btn-small-lg: 0.75rem;
  --vf-py-group-tabs: 0.375rem;
  --vf-py-group-tabs-sm: 0.375rem;
  --vf-py-group-tabs-lg: 0.625rem;
  --vf-px-group-tabs: 0.75rem;
  --vf-px-group-tabs-sm: 0.5rem;
  --vf-px-group-tabs-lg: 0.875rem;
  --vf-py-group-blocks: 0.75rem;
  --vf-py-group-blocks-sm: 0.625rem;
  --vf-py-group-blocks-lg: 0.875rem;
  --vf-px-group-blocks: 1rem;
  --vf-px-group-blocks-sm: 1rem;
  --vf-px-group-blocks-lg: 1rem;
  --vf-py-tag: 0px;
  --vf-py-tag-sm: 0px;
  --vf-py-tag-lg: 0px;
  --vf-px-tag: 0.4375rem;
  --vf-px-tag-sm: 0.4375rem;
  --vf-px-tag-lg: 0.4375rem;
  --vf-py-slider-tooltip: 0.125rem;
  --vf-py-slider-tooltip-sm: 0.0625rem;
  --vf-py-slider-tooltip-lg: 0.1875rem;
  --vf-px-slider-tooltip: 0.375rem;
  --vf-px-slider-tooltip-sm: 0.3125rem;
  --vf-px-slider-tooltip-lg: 0.5rem;
  --vf-py-blockquote: 0.25rem;
  --vf-py-blockquote-sm: 0.25rem;
  --vf-py-blockquote-lg: 0.25rem;
  --vf-px-blockquote: 0.75rem;
  --vf-px-blockquote-sm: 0.75rem;
  --vf-px-blockquote-lg: 0.75rem;
  --vf-py-hr: 0.25rem;
  --vf-space-addon: 0px;
  --vf-space-addon-sm: 0px;
  --vf-space-addon-lg: 0px;
  --vf-space-checkbox: 0.375rem;
  --vf-space-checkbox-sm: 0.375rem;
  --vf-space-checkbox-lg: 0.375rem;
  --vf-space-tags: 0.1875rem;
  --vf-space-tags-sm: 0.1875rem;
  --vf-space-tags-lg: 0.1875rem;
  --vf-space-static-tag-1: 1rem;
  --vf-space-static-tag-2: 2rem;
  --vf-space-static-tag-3: 3rem;
  --vf-floating-top: 0rem;
  --vf-floating-top-sm: 0rem;
  --vf-floating-top-lg: 0.6875rem;
  --vf-bg-input: #ffffff;
  --vf-bg-input-hover: #ffffff;
  --vf-bg-input-focus: #ffffff;
  --vf-bg-input-danger: #ffffff;
  --vf-bg-input-success: #ffffff;
  --vf-bg-disabled: var(--vf-gray-200);
  --vf-bg-selected: #1118270d;
  --vf-bg-passive: var(--vf-gray-300);
  --vf-bg-icon: var(--vf-gray-500);
  --vf-bg-danger: var(--vf-danger-lighter);
  --vf-bg-success: var(--vf-success-lighter);
  --vf-bg-tag: var(--vf-primary);
  --vf-bg-slider-handle: var(--vf-primary);
  --vf-bg-toggle-handle: #ffffff;
  --vf-bg-date-head: var(--vf-gray-100);
  --vf-bg-addon: #ffffff00;
  --vf-bg-btn: var(--vf-primary);
  --vf-bg-btn-danger: var(--vf-danger);
  --vf-bg-btn-secondary: var(--vf-gray-200);
  --vf-color-input: var(--vf-gray-800);
  --vf-color-input-hover: var(--vf-gray-800);
  --vf-color-input-focus: var(--vf-gray-800);
  --vf-color-input-danger: var(--vf-gray-800);
  --vf-color-input-success: var(--vf-gray-800);
  --vf-color-disabled: var(--vf-gray-400);
  --vf-color-placeholder: var(--vf-gray-300);
  --vf-color-passive: var(--vf-gray-700);
  --vf-color-muted: var(--vf-gray-500);
  --vf-color-floating: var(--vf-gray-500);
  --vf-color-floating-focus: var(--vf-gray-500);
  --vf-color-floating-success: var(--vf-gray-500);
  --vf-color-floating-danger: var(--vf-gray-500);
  --vf-color-danger: var(--vf-danger);
  --vf-color-success: var(--vf-success);
  --vf-color-tag: var(--vf-color-on-primary);
  --vf-color-addon: var(--vf-gray-800);
  --vf-color-date-head: var(--vf-gray-700);
  --vf-color-btn: var(--vf-color-on-primary);
  --vf-color-btn-danger: #ffffff;
  --vf-color-btn-secondary: var(--vf-gray-700);
  --vf-border-color-input: var(--vf-gray-300);
  --vf-border-color-input-hover: var(--vf-gray-300);
  --vf-border-color-input-focus: var(--vf-primary);
  --vf-border-color-input-danger: var(--vf-gray-300);
  --vf-border-color-input-success: var(--vf-gray-300);
  --vf-border-color-checked: var(--vf-primary);
  --vf-border-color-passive: var(--vf-gray-300);
  --vf-border-color-slider-tooltip: var(--vf-primary);
  --vf-border-color-tag: var(--vf-primary);
  --vf-border-color-btn: var(--vf-primary);
  --vf-border-color-btn-danger: var(--vf-danger);
  --vf-border-color-btn-secondary: var(--vf-gray-200);
  --vf-border-color-blockquote: var(--vf-gray-300);
  --vf-border-color-hr: var(--vf-gray-300);
  --vf-border-width-input-t: 1px;
  --vf-border-width-input-r: 1px;
  --vf-border-width-input-b: 1px;
  --vf-border-width-input-l: 1px;
  --vf-border-width-radio-t: 1px;
  --vf-border-width-radio-r: 1px;
  --vf-border-width-radio-b: 1px;
  --vf-border-width-radio-l: 1px;
  --vf-border-width-checkbox-t: 1px;
  --vf-border-width-checkbox-r: 1px;
  --vf-border-width-checkbox-b: 1px;
  --vf-border-width-checkbox-l: 1px;
  --vf-border-width-dropdown: 1px;
  --vf-border-width-btn: 1px;
  --vf-border-width-toggle: 0.125rem;
  --vf-border-width-tag: 1px;
  --vf-border-width-blockquote: 3px;
  --vf-shadow-input: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  --vf-shadow-input-hover: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  --vf-shadow-input-focus: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  --vf-shadow-handles: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  --vf-shadow-handles-hover: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  --vf-shadow-handles-focus: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  --vf-shadow-btn: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  --vf-shadow-dropdown: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  --vf-radius-input: 0.25rem;
  --vf-radius-input-sm: 0.25rem;
  --vf-radius-input-lg: 0.25rem;
  --vf-radius-btn: 0.25rem;
  --vf-radius-btn-sm: 0.25rem;
  --vf-radius-btn-lg: 0.25rem;
  --vf-radius-small: 0.25rem;
  --vf-radius-small-sm: 0.25rem;
  --vf-radius-small-lg: 0.25rem;
  --vf-radius-large: 0.25rem;
  --vf-radius-large-sm: 0.25rem;
  --vf-radius-large-lg: 0.25rem;
  --vf-radius-tag: 0.25rem;
  --vf-radius-tag-sm: 0.25rem;
  --vf-radius-tag-lg: 0.25rem;
  --vf-radius-checkbox: 0.25rem;
  --vf-radius-checkbox-sm: 0.25rem;
  --vf-radius-checkbox-lg: 0.25rem;
  --vf-radius-slider: 0.25rem;
  --vf-radius-slider-sm: 0.25rem;
  --vf-radius-slider-lg: 0.25rem;
  --vf-radius-image: 0.25rem;
  --vf-radius-image-sm: 0.25rem;
  --vf-radius-image-lg: 0.25rem;
  --vf-radius-gallery: 0.25rem;
  --vf-radius-gallery-sm: 0.25rem;
  --vf-radius-gallery-lg: 0.25rem;
  --vf-checkbox-size: 1rem;
  --vf-checkbox-size-sm: 0.875rem;
  --vf-checkbox-size-lg: 1rem;
  --vf-gallery-size: 6rem;
  --vf-gallery-size-sm: 5rem;
  --vf-gallery-size-lg: 7rem;
  --vf-toggle-width: 3rem;
  --vf-toggle-width-sm: 2.75rem;
  --vf-toggle-width-lg: 3rem;
  --vf-toggle-height: 1.25rem;
  --vf-toggle-height-sm: 1rem;
  --vf-toggle-height-lg: 1.25rem;
  --vf-slider-height: 0.375rem;
  --vf-slider-height-sm: 0.3125rem;
  --vf-slider-height-lg: 0.5rem;
  --vf-slider-height-vertical: 20rem;
  --vf-slider-height-vertical-sm: 20rem;
  --vf-slider-height-vertical-lg: 20rem;
  --vf-slider-handle-size: 1rem;
  --vf-slider-handle-size-sm: 0.875rem;
  --vf-slider-handle-size-lg: 1.25rem;
  --vf-slider-tooltip-distance: 0.5rem;
  --vf-slider-tooltip-distance-sm: 0.375rem;
  --vf-slider-tooltip-distance-lg: 0.5rem;
  --vf-slider-tooltip-arrow-size: 0.3125rem;
  --vf-slider-tooltip-arrow-size-sm: 0.3125rem;
  --vf-slider-tooltip-arrow-size-lg: 0.3125rem;
}

.green-divider {
  border-color: #07bf9b !important;
  border-width: 2px !important;
  margin: 1.5rem 0 !important;
}
</style>