import { Github, Info, ShieldCheck, ScrollText, Star, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import logoF from './logoo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/HarshS16/Civix",
      icon: Github,
      color: "hover:text-emerald-500 dark:hover:text-green-400",
    },
  ];

  const footerLinks = [
    {
      title: "Civix",
      links: [
        {
          name: "About",
          href: "/about",
          icon: Info,
          color: "text-emerald-500",
        },
        {
          name: "Features",
          href: "/#features",
          icon: Star,
          color: "text-emerald-500",
        },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          name: "Privacy",
          href: "/privacy",
          icon: ShieldCheck,
          color: "text-emerald-500",
        },
        {
          name: "Terms",
          href: "/terms",
          icon: ScrollText,
          color: "text-emerald-500",
        },
        {
          name: "Our contributors",
          href: "/contributors",
          icon: UsersIcon,
          color: "text-emerald-500",
        },
      ],
    },
  ];

  return (
    <footer className="border-t bg-slate-50 dark:bg-[#111827] text-gray-600 dark:text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logoF} alt="" style={{width : '90px'}} />
            </div>
            <p className="mt-4 max-w-md text-sm">
              Civix is designed to empower and inform citizens. Stay informed, make better decisions, and explore features built for civic engagement.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 transition-colors duration-200 ${social.color}`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Link Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="hover:text-emerald-500 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <link.icon className={`w-4 h-4 ${link.color}`} />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left text-sm text-muted-foreground dark:text-muted-foreground">
              <p>© {currentYear} Civix. All rights reserved.</p>
            </div>
            <div className="text-sm text-muted-foreground dark:text-muted-foreground">
              <span>
                Built with ❤️ by{" "}
                <a
                  href="https://github.com/HarshS16/Civix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:text-emerald-600 dark:hover:text-green-400 transition-colors"
                >
                  Harsh S.
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
