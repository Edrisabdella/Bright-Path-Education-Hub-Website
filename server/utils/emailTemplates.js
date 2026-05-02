exports.welcomeEmail = (name) => `
  <h2>Welcome to BrightPath, ${name}!</h2>
  <p>We're excited to have you on board. Start exploring our courses and resources.</p>
`;

exports.resetPasswordEmail = (resetUrl) => `
  <p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.</p>
`;