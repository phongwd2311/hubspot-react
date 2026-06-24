import { useState } from 'react';
import styles from '../../styles/implementation-top-header.module.css';

function getImageAlt(image, fallback) {
  return image?.alt || image?.altText || fallback || '';
}

function getLinkHref(link) {
  return link?.url?.href || '#';
}

function getLinkAttrs(link) {
  const relValues = [
    link?.open_in_new_tab ? 'noreferrer' : '',
    link?.no_follow ? 'nofollow' : '',
  ].filter(Boolean);

  return {
    href: getLinkHref(link),
    target: link?.open_in_new_tab ? '_blank' : undefined,
    rel: relValues.length ? relValues.join(' ') : undefined,
  };
}

const fallbackLinks = [
  { nav_label: 'Bản quyền', link: { url: { href: '#' } } },
  { nav_label: 'Tính giá', link: { url: { href: '#' } } },
  { nav_label: 'Dịch vụ', link: { url: { href: '#' } } },
  { nav_label: 'Tài liệu', link: { url: { href: '#' } } },
  { nav_label: 'Công ty', link: { url: { href: '#' } } },
];

const licenseDropdownGroups = [
  {
    brand: 'ATLASSIAN',
    items: ['Jira', 'Confluence', 'Service Collection', 'Teamwork Collection'],
  },
  {
    brand: 'salesforce',
    items: ['CRM', 'Non-profit'],
  },
  {
    brand: 'slack',
    subBrand: 'from Salesforce',
    items: [],
  },
  {
    brand: 'Google',
    items: ['Google Workspace', 'Google AI'],
  },
];

export default function ImplementationTopHeader({ fieldValues }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobilePanel, setActiveMobilePanel] = useState(null);
  const {
    header_logo_image,
    header_links = [],
    contact_label,
    contact_link,

    license_atlassian_logo,
    license_salesforce_logo,
    license_slack_logo,
    license_google_logo,

    pricing_atlassian_logo,
    pricing_salesforce_logo,
    pricing_google_workspace_logo,
    pricing_slack_logo,
    pricing_google_ai_logo,

    service_atlassian_logo,
    service_ai_logo,
    service_salesforce_logo,
    service_hubspot_logo,
    service_kubernetes_logo,
  } = fieldValues || {};

  const navLinks = header_links.length ? header_links : fallbackLinks;
  const licenseDropdownGroups = [
    {
      brand: 'ATLASSIAN',
      logo: license_atlassian_logo,
      items: [
        'Jira',
        'Confluence',
        'Service Collection',
        'Teamwork Collection',
      ],
    },
    {
      brand: 'salesforce',
      logo: license_salesforce_logo,
      items: ['CRM', 'Non-profit'],
    },
    {
      brand: 'slack',
      subBrand: 'from Salesforce',
      logo: license_slack_logo,
      items: [],
    },
    {
      brand: 'Google',
      logo: license_google_logo,
      items: ['Google Workspace', 'Google AI'],
    },
  ];

  const pricingDropdownItems = [
    {
      label: 'ATLASSIAN',
      logo: pricing_atlassian_logo || license_atlassian_logo,
    },
    {
      label: 'salesforce',
      logo: pricing_salesforce_logo || license_salesforce_logo,
    },
    {
      label: 'Google Workspace',
      logo: pricing_google_workspace_logo || license_google_logo,
    },
    {
      label: 'slack',
      logo: pricing_slack_logo || license_slack_logo,
    },
    {
      label: 'Google AI',
      logo: pricing_google_ai_logo || license_google_logo,
    },
  ];
  const documentDropdownItems = ['Blog', 'Gated content', 'Customer story'];
  const companyDropdownItems = ['Cuộc sống AgileOps', 'Chuyên gia'];

  const serviceDropdownGroups = [
    {
      key: 'atlassian',
      label: 'ATLASSIAN',
      logo: service_atlassian_logo || license_atlassian_logo,
      items: ['Migration', 'ITSM'],
    },
    {
      key: 'ai',
      label: 'AI',
      logo: service_ai_logo,
      items: ['Claude', 'Google AI'],
    },
    {
      key: 'salesforce',
      label: 'salesforce',
      logo: service_salesforce_logo || license_salesforce_logo,
      items: [],
    },
    {
      key: 'non-profit',
      label: 'Non-profit',
      logo: null,
      items: [],
    },
    {
      key: 'hubspot',
      label: 'HubSpot',
      logo: service_hubspot_logo,
      items: [],
    },
    {
      key: 'kubernetes',
      label: 'kubernetes',
      logo: service_kubernetes_logo,
      items: [],
    },
  ];

  const mobilePanelTitles = {
    license: 'Bản quyền',
    pricing: 'Tính giá',
    service: 'Dịch vụ',
    document: 'Tài liệu',
    company: 'Công ty',
  };

  function getMobilePanelKey(navLabel) {
    if (navLabel === 'Bản quyền') return 'license';
    if (navLabel === 'Tính giá') return 'pricing';
    if (navLabel === 'Dịch vụ') return 'service';
    if (navLabel === 'Tài liệu') return 'document';
    if (navLabel === 'Công ty') return 'company';

    return null;
  }

  function openMobileMenu() {
    setActiveMobilePanel(null);
    setIsMobileMenuOpen(true);
  }

  function closeMobileMenu() {
    setActiveMobilePanel(null);
    setIsMobileMenuOpen(false);
  }

  return (
    <div className={styles.topHeaderWrap}>
      <header className={styles.topHeaderBar}>
        <div className={styles.topHeaderMainGroup}>
          <button
            type="button"
            className={`${styles.topHeaderMobileToggle} ${
              isMobileMenuOpen ? styles.topHeaderMobileToggleOpen : ''
            }`}
            aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="top-header-mobile-drawer"
            onClick={() => {
              if (isMobileMenuOpen) {
                closeMobileMenu();
              } else {
                openMobileMenu();
              }
            }}
          >
            <span />
          </button>

          <a className={styles.topHeaderLogo} href="/" aria-label="AgileOps">
            {header_logo_image?.src ? (
              <img
                className={styles.topHeaderLogoImage}
                src={header_logo_image.src}
                alt={
                  header_logo_image.alt ||
                  header_logo_image.altText ||
                  'AgileOps'
                }
              />
            ) : (
              <span className={styles.topHeaderLogoText}>AgileOps</span>
            )}
          </a>

          <nav className={styles.topHeaderNav} aria-label="Main navigation">
            {navLinks.map((item, index) => {
              const navLabel = item.nav_label || item.label || '';
              const isLicenseMenu = navLabel === 'Bản quyền';
              const isPricingMenu = navLabel === 'Tính giá';
              const isServiceMenu = navLabel === 'Dịch vụ';
              const isDocumentMenu = navLabel === 'Tài liệu';
              const isCompanyMenu = navLabel === 'Công ty';

              const hasDropdown =
                isLicenseMenu ||
                isPricingMenu ||
                isServiceMenu ||
                isDocumentMenu ||
                isCompanyMenu;
              return (
                <div
                  key={`${navLabel}-${index}`}
                  className={`${styles.topHeaderNavItem} ${
                    hasDropdown ? styles.topHeaderNavItemHasDropdown : ''
                  }`}
                >
                  <button
                    type="button"
                    className={styles.topHeaderNavLink}
                    aria-haspopup={hasDropdown ? 'menu' : undefined}
                  >
                    <span>{navLabel}</span>
                  </button>

                  {isLicenseMenu && (
                    <div className={styles.topHeaderDropdown}>
                      {licenseDropdownGroups.map((group) => (
                        <div
                          key={group.brand}
                          className={styles.topHeaderDropdownGroup}
                        >
                          <div className={styles.topHeaderDropdownBrand}>
                            {group.logo?.src ? (
                              <img
                                className={styles.topHeaderDropdownLogo}
                                src={group.logo.src}
                                alt={
                                  group.logo.alt ||
                                  group.logo.altText ||
                                  group.brand
                                }
                              />
                            ) : (
                              <>
                                <span>{group.brand}</span>
                                {group.subBrand && (
                                  <small>{group.subBrand}</small>
                                )}
                              </>
                            )}
                          </div>

                          {group.items.map((dropdownItem) => (
                            <a
                              key={dropdownItem}
                              className={styles.topHeaderDropdownLink}
                              href="#"
                            >
                              <span>{dropdownItem}</span>
                              <span className={styles.topHeaderDropdownArrow}>
                                →
                              </span>
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                  {isPricingMenu && (
                    <div
                      className={`${styles.topHeaderDropdown} ${styles.topHeaderPricingDropdown}`}
                    >
                      <div className={styles.topHeaderPricingList}>
                        {pricingDropdownItems.map((pricingItem) => (
                          <a
                            key={pricingItem.label}
                            className={styles.topHeaderPricingLink}
                            href="#"
                          >
                            <span className={styles.topHeaderPricingBrand}>
                              {pricingItem.logo?.src ? (
                                <img
                                  className={styles.topHeaderPricingLogo}
                                  src={pricingItem.logo.src}
                                  alt={
                                    pricingItem.logo.alt ||
                                    pricingItem.logo.altText ||
                                    pricingItem.label
                                  }
                                />
                              ) : (
                                <span className={styles.topHeaderPricingText}>
                                  {pricingItem.label}
                                </span>
                              )}
                            </span>

                            <span className={styles.topHeaderDropdownArrow}>
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {isDocumentMenu && (
                    <div
                      className={`${styles.topHeaderDropdown} ${styles.topHeaderDocumentDropdown}`}
                    >
                      <div className={styles.topHeaderDocumentList}>
                        {documentDropdownItems.map((documentItem) => (
                          <a
                            key={documentItem}
                            className={styles.topHeaderDocumentLink}
                            href="#"
                          >
                            <span>{documentItem}</span>
                            <span className={styles.topHeaderDropdownArrow}>
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {isCompanyMenu && (
                    <div
                      className={`${styles.topHeaderDropdown} ${styles.topHeaderCompanyDropdown}`}
                    >
                      <div className={styles.topHeaderCompanyList}>
                        {companyDropdownItems.map((companyItem) => (
                          <a
                            key={companyItem}
                            className={styles.topHeaderCompanyLink}
                            href="#"
                          >
                            <span>{companyItem}</span>
                            <span className={styles.topHeaderDropdownArrow}>
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {isServiceMenu && (
                    <div
                      className={`${styles.topHeaderDropdown} ${styles.topHeaderServiceDropdown}`}
                    >
                      <div className={styles.topHeaderServiceList}>
                        {serviceDropdownGroups.map((serviceGroup) =>
                          serviceGroup.items.length ? (
                            <div
                              key={serviceGroup.key}
                              className={styles.topHeaderServiceGroup}
                              data-service-menu={serviceGroup.key}
                            >
                              <div className={styles.topHeaderServiceBrand}>
                                {serviceGroup.logo?.src ? (
                                  <img
                                    className={styles.topHeaderServiceLogo}
                                    src={serviceGroup.logo.src}
                                    alt={
                                      serviceGroup.logo.alt ||
                                      serviceGroup.logo.altText ||
                                      serviceGroup.label
                                    }
                                  />
                                ) : serviceGroup.key === 'ai' ? (
                                  <span
                                    className={
                                      styles.topHeaderServiceAiFallback
                                    }
                                  >
                                    <span>AI</span>
                                    <small>✦</small>
                                  </span>
                                ) : (
                                  <span className={styles.topHeaderServiceText}>
                                    {serviceGroup.label}
                                  </span>
                                )}
                              </div>

                              {serviceGroup.items.map((serviceItem) => (
                                <a
                                  key={serviceItem}
                                  className={styles.topHeaderServiceLink}
                                  href="#"
                                >
                                  <span>{serviceItem}</span>
                                  <span
                                    className={styles.topHeaderDropdownArrow}
                                  >
                                    →
                                  </span>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <a
                              key={serviceGroup.key}
                              className={styles.topHeaderServiceSingleLink}
                              data-service-menu={serviceGroup.key}
                              href="#"
                            >
                              <span
                                className={styles.topHeaderServiceSingleBrand}
                              >
                                {serviceGroup.logo?.src ? (
                                  <img
                                    className={styles.topHeaderServiceLogo}
                                    src={serviceGroup.logo.src}
                                    alt={
                                      serviceGroup.logo.alt ||
                                      serviceGroup.logo.altText ||
                                      serviceGroup.label
                                    }
                                  />
                                ) : (
                                  <span className={styles.topHeaderServiceText}>
                                    {serviceGroup.label}
                                  </span>
                                )}
                              </span>

                              <span className={styles.topHeaderDropdownArrow}>
                                →
                              </span>
                            </a>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <a
          className={styles.topHeaderCta}
          {...getLinkAttrs(contact_link || { url: { href: '#' } })}
        >
          <span>{contact_label || 'LIÊN HỆ'}</span>
        </a>
      </header>

      {isMobileMenuOpen && (
        <div className={styles.topHeaderMobileMenuLayer}>
          <button
            type="button"
            className={styles.topHeaderMobileMenuBackdrop}
            aria-label="Đóng menu"
            onClick={closeMobileMenu}
          />

          <aside
            id="top-header-mobile-drawer"
            className={styles.topHeaderMobileDrawer}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {activeMobilePanel ? (
              <>
                <div className={styles.topHeaderMobileSubHeader}>
                  <button
                    type="button"
                    className={styles.topHeaderMobileBack}
                    onClick={() => setActiveMobilePanel(null)}
                  >
                    <span className={styles.topHeaderMobileBackIcon}>‹</span>
                    <span>Main Menu</span>
                  </button>

                  <button
                    type="button"
                    className={styles.topHeaderMobileClose}
                    aria-label="Đóng menu"
                    onClick={closeMobileMenu}
                  >
                    ×
                  </button>
                </div>

                <div className={styles.topHeaderMobilePanel}>
                  <div
                    key={activeMobilePanel}
                    className={styles.topHeaderMobilePanelContent}
                  >
                    {activeMobilePanel === 'license' && (
                      <>
                        {licenseDropdownGroups.map((group) => (
                          <div
                            key={group.brand}
                            className={styles.topHeaderMobilePanelGroup}
                          >
                            <div className={styles.topHeaderMobilePanelBrand}>
                              {group.logo?.src ? (
                                <img
                                  className={styles.topHeaderMobilePanelLogo}
                                  src={group.logo.src}
                                  alt={
                                    group.logo.alt ||
                                    group.logo.altText ||
                                    group.brand
                                  }
                                />
                              ) : (
                                <>
                                  <span>{group.brand}</span>
                                  {group.subBrand && (
                                    <small>{group.subBrand}</small>
                                  )}
                                </>
                              )}
                            </div>

                            {group.items.map((dropdownItem) => (
                              <a
                                key={dropdownItem}
                                className={styles.topHeaderMobilePanelLink}
                                href="#"
                                onClick={closeMobileMenu}
                              >
                                <span>{dropdownItem}</span>
                                <span
                                  className={styles.topHeaderMobilePanelArrow}
                                >
                                  →
                                </span>
                              </a>
                            ))}
                          </div>
                        ))}
                      </>
                    )}

                    {activeMobilePanel === 'pricing' && (
                      <div
                        className={`${styles.topHeaderMobilePanelGroup} ${styles.topHeaderMobilePricingPanelGroup}`}
                      >
                        {pricingDropdownItems.map((pricingItem) => (
                          <a
                            key={pricingItem.label}
                            className={styles.topHeaderMobilePanelLink}
                            href="#"
                            onClick={closeMobileMenu}
                          >
                            <span
                              className={styles.topHeaderMobilePanelSingleBrand}
                            >
                              {pricingItem.logo?.src ? (
                                <img
                                  className={styles.topHeaderMobilePanelLogo}
                                  src={pricingItem.logo.src}
                                  alt={
                                    pricingItem.logo.alt ||
                                    pricingItem.logo.altText ||
                                    pricingItem.label
                                  }
                                />
                              ) : (
                                <span>{pricingItem.label}</span>
                              )}
                            </span>

                            <span className={styles.topHeaderMobilePanelArrow}>
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    )}

                    {activeMobilePanel === 'service' && (
                      <>
                        {serviceDropdownGroups.map((serviceGroup) =>
                          serviceGroup.items.length ? (
                            <div
                              key={serviceGroup.key}
                              className={styles.topHeaderMobilePanelGroup}
                            >
                              <div className={styles.topHeaderMobilePanelBrand}>
                                {serviceGroup.logo?.src ? (
                                  <img
                                    className={styles.topHeaderMobilePanelLogo}
                                    src={serviceGroup.logo.src}
                                    alt={
                                      serviceGroup.logo.alt ||
                                      serviceGroup.logo.altText ||
                                      serviceGroup.label
                                    }
                                  />
                                ) : (
                                  <span>{serviceGroup.label}</span>
                                )}
                              </div>

                              {serviceGroup.items.map((serviceItem) => (
                                <a
                                  key={serviceItem}
                                  className={styles.topHeaderMobilePanelLink}
                                  href="#"
                                  onClick={closeMobileMenu}
                                >
                                  <span>{serviceItem}</span>
                                  <span
                                    className={styles.topHeaderMobilePanelArrow}
                                  >
                                    →
                                  </span>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <a
                              key={serviceGroup.key}
                              className={styles.topHeaderMobilePanelLink}
                              href="#"
                              onClick={closeMobileMenu}
                            >
                              <span
                                className={
                                  styles.topHeaderMobilePanelSingleBrand
                                }
                              >
                                {serviceGroup.logo?.src ? (
                                  <img
                                    className={styles.topHeaderMobilePanelLogo}
                                    src={serviceGroup.logo.src}
                                    alt={
                                      serviceGroup.logo.alt ||
                                      serviceGroup.logo.altText ||
                                      serviceGroup.label
                                    }
                                  />
                                ) : (
                                  <span>{serviceGroup.label}</span>
                                )}
                              </span>

                              <span
                                className={styles.topHeaderMobilePanelArrow}
                              >
                                →
                              </span>
                            </a>
                          ),
                        )}
                      </>
                    )}

                    {activeMobilePanel === 'document' && (
                      <div className={styles.topHeaderMobilePanelGroup}>
                        {documentDropdownItems.map((documentItem) => (
                          <a
                            key={documentItem}
                            className={styles.topHeaderMobilePanelLink}
                            href="#"
                            onClick={closeMobileMenu}
                          >
                            <span>{documentItem}</span>
                            <span className={styles.topHeaderMobilePanelArrow}>
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    )}

                    {activeMobilePanel === 'company' && (
                      <div className={styles.topHeaderMobilePanelGroup}>
                        {companyDropdownItems.map((companyItem) => (
                          <a
                            key={companyItem}
                            className={styles.topHeaderMobilePanelLink}
                            href="#"
                            onClick={closeMobileMenu}
                          >
                            <span>{companyItem}</span>
                            <span className={styles.topHeaderMobilePanelArrow}>
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.topHeaderMobileClose}
                  aria-label="Đóng menu"
                  onClick={closeMobileMenu}
                >
                  ×
                </button>

                <div className={styles.topHeaderMobileDrawerTop}>
                  <a
                    className={styles.topHeaderMobileDrawerLogo}
                    href="/"
                    aria-label="AgileOps"
                    onClick={closeMobileMenu}
                  >
                    {header_logo_image?.src ? (
                      <img
                        className={styles.topHeaderMobileDrawerLogoImage}
                        src={header_logo_image.src}
                        alt={
                          header_logo_image.alt ||
                          header_logo_image.altText ||
                          'AgileOps'
                        }
                      />
                    ) : (
                      <span>AgileOps</span>
                    )}
                  </a>
                </div>

                <nav key="main-menu" className={styles.topHeaderMobileMenu}>
                  {navLinks.map((item, index) => {
                    const navLabel = item.nav_label || item.label || '';
                    const mobilePanelKey = getMobilePanelKey(navLabel);

                    return (
                      <button
                        key={`${navLabel}-${index}`}
                        type="button"
                        className={styles.topHeaderMobileMenuLink}
                        onClick={() => {
                          if (mobilePanelKey) {
                            setActiveMobilePanel(mobilePanelKey);
                          }
                        }}
                      >
                        <span>{navLabel}</span>
                        <span className={styles.topHeaderMobileMenuChevron}>
                          ›
                        </span>
                      </button>
                    );
                  })}
                </nav>

                <div className={styles.topHeaderMobileMenuBottom}>
                  <a
                    className={styles.topHeaderMobileContact}
                    {...getLinkAttrs(contact_link || { url: { href: '#' } })}
                    onClick={closeMobileMenu}
                  >
                    <span>{contact_label || 'LIÊN HỆ'}</span>
                  </a>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
