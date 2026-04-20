import nodemailer from "nodemailer";

const NOTIFY_EMAIL = "jino.kim@ohitech.co.kr";

// SMTP configuration via environment variables
// Set these in your .env or PM2 ecosystem config:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user ? { user, pass } : undefined,
  });
}

interface InquiryData {
  type: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  message: string;
  product_id?: number | null;
}

const TYPE_LABELS: Record<string, string> = {
  general: "일반 문의 (General Inquiry)",
  quote: "견적 요청 (Quote Request)",
  support: "기술 지원 (Technical Support)",
};

export async function sendInquiryNotification(data: InquiryData) {
  const transporter = getTransporter();
  const fromAddr = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@ohitech.co.kr";
  const typeLabel = TYPE_LABELS[data.type] || data.type;

  const htmlBody = `
    <div style="font-family: 'Malgun Gothic', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a2332; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 18px;">🔔 새로운 ${typeLabel}</h2>
        <p style="margin: 4px 0 0; opacity: 0.8; font-size: 13px;">OHI Tech 홈페이지에서 접수된 문의입니다</p>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600; width: 120px; border-bottom: 1px solid #e5e7eb;">문의 유형</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${typeLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600; border-bottom: 1px solid #e5e7eb;">회사명</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${data.company_name || "-"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600; border-bottom: 1px solid #e5e7eb;">담당자명</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${data.contact_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600; border-bottom: 1px solid #e5e7eb;">이메일</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600; border-bottom: 1px solid #e5e7eb;">연락처</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${data.phone || "-"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600; border-bottom: 1px solid #e5e7eb;">국가</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${data.country || "-"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600; border-bottom: 1px solid #e5e7eb;">제목</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${data.subject}</td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
          <p style="margin: 0 0 8px; font-weight: 600; font-size: 13px; color: #374151;">내용:</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="margin: 16px 0 0; font-size: 12px; color: #9ca3af;">
          이 메일은 OHI Tech 홈페이지 문의 폼에서 자동 발송되었습니다.
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: fromAddr,
    to: NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `[OHI Tech ${typeLabel}] ${data.subject}`,
    html: htmlBody,
    text: `새로운 ${typeLabel}\n\n문의 유형: ${typeLabel}\n회사명: ${data.company_name || "-"}\n담당자명: ${data.contact_name}\n이메일: ${data.email}\n연락처: ${data.phone || "-"}\n국가: ${data.country || "-"}\n제목: ${data.subject}\n\n내용:\n${data.message}`,
  };

  await transporter.sendMail(mailOptions);
}
