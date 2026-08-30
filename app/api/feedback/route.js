import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function POST(req) {
    try {
        const { reason } = await req.json();

        if (!reason || !reason.trim()) {
            return Response.json({ error: "Reason is required" }, { status: 400 });
        }

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.FEEDBACK_MAILBOX,
            subject: "Account Deletion Feedback",
            text: reason.trim(),
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error("Nodemailer error:", error);
        return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
}