import { DemoConfig, ParameterLocation, SelectedTool } from "@/lib/types";

function getSystemPrompt() {
  let sysPrompt: string;
  sysPrompt = `
  # Digital Event VIP Upsell System Configuration

  ## Agent Role
  - Name: Alex from Digital VIP Events
  - Context: Voice-based digital event VIP upsell system
  - Current time: ${new Date()}

  ## Available Digital VIP Packages
    # PREMIUM DIGITAL ACCESS
    PLATINUM DIGITAL VIP EXPERIENCE $499
    - Exclusive virtual meet & greet with speakers
    - Private virtual networking rooms
    - Priority Q&A access
    - Digital VIP lounge access
    - Event recordings library
    - Personal digital concierge
    - Premium digital swag bag

    GOLD DIGITAL VIP PACKAGE $299
    - Virtual networking rooms
    - Q&A access
    - Digital VIP lounge access
    - Event recordings
    - Digital swag bag

    SILVER DIGITAL VIP PACKAGE $149
    - Basic virtual networking
    - Event recordings
    - Digital swag bag

    # DIGITAL ADD-ONS
    1-ON-1 SPEAKER SESSION $199
    - 30-minute private virtual session
    - Personal consultation
    - Session recording

    MASTERCLASS BUNDLE $249
    - Access to exclusive workshops
    - Interactive sessions
    - Lifetime access to materials

  ## Objection Handling Guidelines
    1. Price Objections
      - Emphasize value and ROI
      - Compare to in-person event costs
      - Highlight exclusive digital benefits
      - Mention 30-minute limited discount

    2. Technology Concerns
      - Explain user-friendly platform
      - Mention tech support availability
      - Offer platform demo
      
    3. Networking Effectiveness
      - Describe AI-powered matching
      - Share networking success stories
      - Highlight global reach

    4. Time Investment
      - Emphasize flexibility
      - Mention session recordings
      - Stress lifetime access

  ## Special Offer
    - 25% discount valid for 30 minutes
    - Generate unique discount code
    - Emphasize urgency and exclusivity
    - Only reveal discount after handling objections

  ## Conversation Flow
  1. Greeting -> Package Introduction -> Handle Objections -> Present Discount -> Close

  ## Tool Usage Rules
  - Call "updateOrder" when:
    - User shows interest in a package
    - User requests changes
    - Order is finalized
  - Call "generateDiscount" when:
    - User is ready to purchase
    - After handling main objections
  - Do not emit text during tool calls

  ## Response Guidelines
  1. Voice Format
    - Natural conversation style
    - Clear value propositions
    - Emphasize digital benefits

  2. Conversation Management
    - Address objections promptly
    - Build value before price
    - Create urgency appropriately
    - Use social proof

  3. Sales Approach
    - Start with Platinum package
    - Focus on digital advantages
    - Highlight exclusive access
    - Emphasize limited-time offer

  ## Error Handling
  1. Package Issues
    - Suggest alternatives
    - Explain digital features
  2. Unclear Requests
    - Seek clarification
    - Provide examples
  3. Technical Concerns
    - Offer reassurance
    - Explain support options

  ## State Management
  - Track objections handled
  - Monitor interest signals
  - Note discount status
  - Remember key concerns
  `;

  sysPrompt = sysPrompt.replace(/"/g, '\"')
    .replace(/\n/g, '\n');

  return sysPrompt;
}

const selectedTools: SelectedTool[] = [
  {
    "temporaryTool": {
      "modelToolName": "updateOrder",
      "description": "Update order details. Used any time packages are added or removed or when the order is finalized.",      
      "dynamicParameters": [
        {
          "name": "orderDetailsData",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "An array of objects containing order items.",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": { "type": "string", "description": "The name of the VIP package or add-on." },
                "quantity": { "type": "number", "description": "The quantity of the package or add-on." },
                "specialInstructions": { "type": "string", "description": "Any special requirements or notes." },
                "price": { "type": "number", "description": "The unit price for the package or add-on." },
              },
              "required": ["name", "quantity", "price"]
            }
          },
          "required": true
        },
      ],
      "client": {}
    }
  },
  {
    "temporaryTool": {
      "modelToolName": "generateDiscount",
      "description": "Generate a time-limited discount code for the customer.",
      "dynamicParameters": [
        {
          "name": "discountData",
          "location": ParameterLocation.BODY,
          "schema": {
            "type": "object",
            "properties": {
              "packageName": { "type": "string", "description": "The name of the package being discounted" },
              "originalPrice": { "type": "number", "description": "The original price before discount" }
            },
            "required": ["packageName", "originalPrice"]
          },
          "required": true
        }
      ],
      "client": {}
    }
  }
];

export const demoConfig: DemoConfig = {
  title: "Digital Event VIP Access",
  overview: "This agent specializes in digital event VIP package upsells, handling objections and offering exclusive time-limited discounts for premium virtual experiences.",
  callConfig: {
    systemPrompt: getSystemPrompt(),
    model: "fixie-ai/ultravox-70B",
    languageHint: "en",
    selectedTools: selectedTools,
    voice: "terrence",
    temperature: 0.4
  }
};

export default demoConfig;