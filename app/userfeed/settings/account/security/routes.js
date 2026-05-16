

export const loginChecks = [
  {
    title: "Login & recovery",
    desc: "Manage your password, login preferences and recovery methods.",
    items: [
      { label: "Change password",
        path: "/userfeed/settings/account/security/passwordChange" , },
      { label: "Two-factor authentication", 
        path: "/userfeed/settings/account/security/twoFA" , },
      { label: "Saved login", 
        path: "/userfeed/settings/account/security/savedLogins" , },
    ],
  },
 
];

export const securityChecks = [
  {
    title: "Security checks",
    desc: "Review security issues by running checks across apps, devices and emails sent.",
    items: [
      { label: "Where you're logged in",
        path: "/userfeed/settings/account/security/loggedIn" , },
      { label: "Recent emails",
        path: "/userfeed/settings/account/security/recentEmails" , },
      { label: "Security Checkup",
        path: "/userfeed/settings/account/security/checkup" , },
    ],
  },
 
];