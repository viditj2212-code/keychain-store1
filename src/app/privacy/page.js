import Link from 'next/link'

/**
 * Privacy Policy page - Flower Store
 */
export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you place an order or create an account, we collect your name, email address, phone number, delivery address, and payment information. This information is necessary to process and deliver your orders.'
        },
        {
          subtitle: 'Automatically Collected Data',
          text: 'We automatically collect certain information about your device, including your IP address, browser type, operating system, and browsing behavior on our website through cookies and similar technologies.'
        },
        {
          subtitle: 'Communication Data',
          text: 'When you contact our customer service team or subscribe to our newsletter, we collect the information you provide in your messages and preferences.'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: [
        {
          text: 'Process and fulfill your flower orders, including delivery coordination and payment processing'
        },
        {
          text: 'Send order confirmations, delivery updates, and customer service communications'
        },
        {
          text: 'Improve our website functionality, product offerings, and customer experience'
        },
        {
          text: 'Send promotional emails and special offers (only if you\'ve opted in)'
        },
        {
          text: 'Prevent fraud and ensure the security of our platform'
        },
        {
          text: 'Comply with legal obligations and enforce our terms of service'
        }
      ]
    },
    {
      title: 'Cookies and Tracking Technologies',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      content: [
        {
          subtitle: 'Essential Cookies',
          text: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.'
        },
        {
          subtitle: 'Analytics Cookies',
          text: 'We use analytics tools like Google Analytics to understand how visitors interact with our website. This helps us improve our services and user experience.'
        },
        {
          subtitle: 'Marketing Cookies',
          text: 'With your consent, we use marketing cookies to deliver personalized advertisements and track the effectiveness of our marketing campaigns.'
        },
        {
          subtitle: 'Your Cookie Choices',
          text: 'You can control cookie preferences through your browser settings. However, disabling certain cookies may affect website functionality.'
        }
      ]
    },
    {
      title: 'Information Sharing and Disclosure',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      content: [
        {
          text: 'We do not sell your personal information to third parties'
        },
        {
          subtitle: 'Service Providers',
          text: 'We share information with trusted service providers who help us operate our business, including payment processors, delivery partners, email service providers, and hosting services. These partners are contractually obligated to protect your data.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.'
        }
      ]
    },
    {
      title: 'Data Retention',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: [
        {
          text: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.'
        },
        {
          text: 'Order information is typically retained for 7 years for accounting and legal purposes.'
        },
        {
          text: 'Marketing data is retained until you unsubscribe or request deletion.'
        },
        {
          text: 'Account information is retained until you request account deletion.'
        }
      ]
    },
    {
      title: 'Data Security',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      content: [
        {
          text: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.'
        },
        {
          text: 'All payment transactions are encrypted using SSL/TLS technology and processed through secure payment gateways.'
        },
        {
          text: 'Our staff is trained on data protection practices and only authorized personnel have access to personal information.'
        },
        {
          text: 'While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.'
        }
      ]
    },
    {
      title: 'Your Privacy Rights',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access and update your personal information at any time through your account settings or by contacting us.'
        },
        {
          subtitle: 'Data Deletion',
          text: 'You can request deletion of your personal data, subject to legal retention requirements. Contact us at hello@petalstem.com to request deletion.'
        },
        {
          subtitle: 'Marketing Opt-Out',
          text: 'You can unsubscribe from marketing emails at any time by clicking the unsubscribe link in our emails or updating your preferences in your account.'
        },
        {
          subtitle: 'Do Not Track',
          text: 'Our website does not currently respond to Do Not Track signals from browsers.'
        }
      ]
    },
    {
      title: 'Children\'s Privacy',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      content: [
        {
          text: 'Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.'
        },
        {
          text: 'If we become aware that we have collected personal information from a child under 13, we will take steps to delete that information as quickly as possible.'
        },
        {
          text: 'If you believe we have collected information from a child under 13, please contact us immediately.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-primary-50/30 to-white overflow-hidden">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Your Data Protection
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Privacy
              <br />
              <span className="text-primary-500">Policy</span>
            </h1>

            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              We value your privacy and are committed to protecting your personal information. Last updated: February 2026
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b-2 border-primary-200">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                    {section.icon}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6 pl-0 md:pl-16">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2">
                      {item.subtitle && (
                        <h3 className="font-display text-lg font-bold text-gray-900">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200 rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us About Privacy
            </h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:privacy@petalstem.com" className="text-primary-600 hover:text-primary-700 transition-colors">
                  privacy@petalstem.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{' '}
                <a href="tel:5551234567" className="text-primary-600 hover:text-primary-700 transition-colors">
                  (555) 123-4567
                </a>
              </p>
              <p>
                <span className="font-semibold">Address:</span> 123 Bloom Street, Garden City, CA 90210
              </p>
            </div>
          </div>

          {/* Policy Updates Notice */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-display font-bold text-gray-900 mb-2">Policy Updates</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/terms"
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary-300 transition-all hover:shadow-xl text-center group"
              >
                <svg className="w-10 h-10 text-primary-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  Terms of Service
                </h3>
              </Link>

              <Link
                href="/returns"
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary-300 transition-all hover:shadow-xl text-center group"
              >
                <svg className="w-10 h-10 text-primary-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <h3 className="font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  Return Policy
                </h3>
              </Link>

              <Link
                href="/shipping"
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary-300 transition-all hover:shadow-xl text-center group"
              >
                <svg className="w-10 h-10 text-primary-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <h3 className="font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  Shipping Info
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
