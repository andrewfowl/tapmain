import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface TechnicalInquiryData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  title: string
  company: string
  subject: string
  subcategory: string
  background: string
  supportDocumentation: string
  inquiry: string
  authoritativeReferences?: string
  preliminaryConclusion?: string
  affirmativeEvidence?: string
  contradictiveEvidence?: string
}

export async function sendTechnicalInquiryEmails(data: TechnicalInquiryData) {
  try {
    // Send confirmation email to the sender
    await resend.emails.send({
      from: "TechAccountingPro <noreply@techaccountingpro.com>",
      to: [data.email],
      subject: "Technical Inquiry Received - TechAccountingPro",
      html: generateConfirmationEmail(data),
    })

    // Send notification email to info@techaccountingpro.com
    await resend.emails.send({
      from: "TechAccountingPro <noreply@techaccountingpro.com>",
      to: ["info@techaccountingpro.com"],
      subject: `New Technical Inquiry from ${data.firstName} ${data.lastName}`,
      html: generateNotificationEmail(data),
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to send emails:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

function generateConfirmationEmail(data: TechnicalInquiryData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Technical Inquiry Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1e40af; }
        .value { margin-top: 5px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Technical Inquiry Received</h1>
      </div>
      <div class="content">
        <p>Dear ${data.firstName} ${data.lastName},</p>
        
        <p>Thank you for submitting your technical accounting inquiry. We have received your submission and our team will review it shortly.</p>
        
        <h3>Your Inquiry Details:</h3>
        
        <div class="field">
          <div class="label">Contact Information:</div>
          <div class="value">${data.firstName} ${data.lastName}<br>
          ${data.title} at ${data.company}<br>
          ${data.email}${data.phone ? `<br>${data.phone}` : ""}</div>
        </div>
        
        <div class="field">
          <div class="label">Subject:</div>
          <div class="value">${data.subject}</div>
        </div>
        
        <div class="field">
          <div class="label">Subcategory:</div>
          <div class="value">${data.subcategory}</div>
        </div>
        
        <div class="field">
          <div class="label">Background:</div>
          <div class="value">${data.background}</div>
        </div>
        
        <div class="field">
          <div class="label">Inquiry/Questions:</div>
          <div class="value">${data.inquiry}</div>
        </div>
        
        ${
          data.preliminaryConclusion
            ? `
        <div class="field">
          <div class="label">Preliminary Conclusion(s):</div>
          <div class="value">${data.preliminaryConclusion}</div>
        </div>
        `
            : ""
        }
        
        <p>We will respond to your inquiry within 2-3 business days. If you have any urgent questions, please contact us directly at info@techaccountingpro.com.</p>
        
        <div class="footer">
          <p>Best regards,<br>
          The TechAccountingPro Team<br>
          <a href="mailto:info@techaccountingpro.com">info@techaccountingpro.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateNotificationEmail(data: TechnicalInquiryData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Technical Inquiry</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #1e40af; }
        .label { font-weight: bold; color: #1e40af; margin-bottom: 8px; }
        .value { white-space: pre-wrap; }
        .urgent { background: #fef2f2; border-left-color: #dc2626; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚨 New Technical Inquiry Received</h1>
      </div>
      <div class="content">
        <p><strong>A new technical accounting inquiry has been submitted and requires review.</strong></p>
        
        <div class="field">
          <div class="label">👤 Contact Information</div>
          <div class="value"><strong>${data.firstName} ${data.lastName}</strong><br>
          ${data.title}<br>
          ${data.company}<br>
          📧 ${data.email}${data.phone ? `<br>📞 ${data.phone}` : ""}</div>
        </div>
        
        <div class="field">
          <div class="label">📋 Subject & Category</div>
          <div class="value"><strong>Subject:</strong> ${data.subject}<br>
          <strong>Subcategory:</strong> ${data.subcategory}</div>
        </div>
        
        <div class="field">
          <div class="label">📖 Background</div>
          <div class="value">${data.background}</div>
        </div>
        
        <div class="field">
          <div class="label">📄 Support Documentation</div>
          <div class="value">${data.supportDocumentation}</div>
        </div>
        
        <div class="field urgent">
          <div class="label">❓ Inquiry/Questions</div>
          <div class="value">${data.inquiry}</div>
        </div>
        
        ${
          data.authoritativeReferences
            ? `
        <div class="field">
          <div class="label">📚 Authoritative References</div>
          <div class="value">${data.authoritativeReferences}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.preliminaryConclusion
            ? `
        <div class="field">
          <div class="label">💡 Preliminary Conclusion(s)</div>
          <div class="value">${data.preliminaryConclusion}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.affirmativeEvidence
            ? `
        <div class="field">
          <div class="label">✅ Affirmative Evidence</div>
          <div class="value">${data.affirmativeEvidence}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.contradictiveEvidence
            ? `
        <div class="field">
          <div class="label">❌ Contradictive Evidence</div>
          <div class="value">${data.contradictiveEvidence}</div>
        </div>
        `
            : ""
        }
        
        <p><strong>⏰ Response Required:</strong> Please respond within 2-3 business days.</p>
      </div>
    </body>
    </html>
  `
}
