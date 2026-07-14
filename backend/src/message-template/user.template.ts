export const generateOtpTemplate = ({
    name,
    otp,
    expiryMinutes = 5,
    company = "Real State",
    supportEmail = "support@example.com",
}: {
    name: string;
    otp: string;
    expiryMinutes?: number;
    company?: string;
    supportEmail?: string;
}) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:40px 15px;">
<tr>
<td align="center">

<table role="presentation" width="600" cellspacing="0" cellpadding="0"
style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

<!-- Header -->
<tr>
<td align="center"
style="padding:40px 30px;background:linear-gradient(135deg,#2563eb,#1d4ed8);">

<h1 style="margin:0;color:#fff;font-size:32px;font-weight:700;">
${company}
</h1>

<p style="margin:12px 0 0;color:#dbeafe;font-size:15px;">
Secure Email Verification
</p>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:45px 40px;">

<h2 style="margin:0 0 20px;color:#111827;font-size:26px;">
Hello ${name},
</h2>

<p style="margin:0;color:#4b5563;font-size:16px;line-height:30px;">
We received a request to verify your email address.
Use the One-Time Password (OTP) below to continue.
</p>

<div style="margin:40px 0;text-align:center;">

<div
style="
display:inline-block;
padding:18px 42px;
background:#eff6ff;
border:2px dashed #2563eb;
border-radius:12px;
font-size:40px;
font-weight:bold;
letter-spacing:12px;
color:#2563eb;
">
${otp}
</div>

</div>

<table width="100%" cellspacing="0" cellpadding="0"
style="background:#f9fafb;border-radius:10px;border:1px solid #e5e7eb;padding:20px;">
<tr>
<td>

<p style="margin:0 0 12px;color:#111827;font-size:15px;">
<strong>Security Information</strong>
</p>

<ul style="margin:0;padding-left:20px;color:#6b7280;font-size:14px;line-height:28px;">
<li>This OTP is valid for <strong>${expiryMinutes} minutes</strong>.</li>
<li>This code can be used only once.</li>
<li>Never share your OTP with anyone.</li>
<li>${company} will never ask for your OTP.</li>
</ul>

</td>
</tr>
</table>

<p style="margin:35px 0 0;color:#6b7280;font-size:15px;line-height:28px;">
If you didn't request this verification, you can safely ignore this email.
No changes will be made to your account.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td
style="padding:30px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">

<p style="margin:0;color:#6b7280;font-size:14px;">
Need help?
<a href="mailto:${supportEmail}"
style="color:#2563eb;text-decoration:none;">
${supportEmail}
</a>
</p>

<p style="margin:15px 0 0;color:#9ca3af;font-size:13px;">
© ${new Date().getFullYear()} ${company}. All Rights Reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};