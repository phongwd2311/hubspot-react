import {
  ModuleFields,
  TextField,
  LinkField,
  ImageField,
} from '@hubspot/cms-components/fields';
import styles from '../../../styles/page-footer.module.css';

export const meta = {
  label: 'AAA Footer',
};

const defaultButtonLink = {
  url: {
    type: 'EXTERNAL',
    href: 'https://www.agileops.vn',
  },
  open_in_new_tab: false,
  no_follow: false,
};

export const fields = (
  <ModuleFields>
    <TextField
      name="cta_line_1"
      label="CTA line 1"
      default="Sẵn sàng mua bản quyền,"
    />

    <TextField
      name="cta_line_2"
      label="CTA line 2"
      default="triển khai phần mềm?"
    />

    <TextField
      name="button_text"
      label="Button text"
      default="Đặt lịch tư vấn"
    />

    <LinkField
      name="button_link"
      label="Button link"
      default={defaultButtonLink}
    />

    <ImageField
      name="logo_image"
      label="Logo image"
      default={{
        src: '',
        alt: 'AgileOps logo',
      }}
    />

    <ImageField
      name="cert_image_left"
      label="Certification image left"
      default={{
        src: '',
        alt: 'Certification badges',
      }}
    />

    <ImageField
      name="cert_image_right"
      label="Certification image right"
      default={{
        src: '',
        alt: 'Certification badges',
      }}
    />

    <ImageField
      name="social_icon_upwork"
      label="Social icon - Upwork"
      default={{
        src: '',
        alt: 'Upwork',
      }}
    />

    <ImageField
      name="social_icon_linkedin"
      label="Social icon - LinkedIn"
      default={{
        src: '',
        alt: 'LinkedIn',
      }}
    />

    <ImageField
      name="social_icon_facebook"
      label="Social icon - Facebook"
      default={{
        src: '',
        alt: 'Facebook',
      }}
    />

    <ImageField
      name="social_icon_youtube"
      label="Social icon - YouTube"
      default={{
        src: '',
        alt: 'YouTube',
      }}
    />

    <TextField
      name="copyright"
      label="Copyright"
      default="© 2022 AGILEOPS. ALL RIGHTS RESERVED | Privacy Policy | Legals"
    />
  </ModuleFields>
);

const footerColumns = [
  {
    groups: [
      {
        title: 'ĐỐI TÁC',
        links: ['Atlassian', 'Salesforce', 'Google Cloud', 'Google', 'Claude'],
      },
    ],
  },
  {
    groups: [
      {
        title: 'BẢN QUYỀN',
        links: [
          'Jira',
          'Confluence',
          'Service management',
          'Teamwork collection',
          'Salesforce CRM',
          'Salesforce Non-profit',
          'Slack',
          'Google Workspace',
          'Google AI',
          'Claude',
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: 'TÍNH GIÁ',
        links: [
          'Atlassian',
          'Salesforce CRM',
          'Slack',
          'Google Workspace',
          'Google AI',
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: 'DỊCH VỤ',
        links: [
          'Atlassian migration',
          'Atlassian ITSM',
          'Claude AI',
          'Google AI',
          'Salesforce Implementation',
          'Salesforce',
          'Non-profit',
          'HubSpot',
          'K8s',
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: 'TÀI LIỆU',
        links: ['Blog', 'Hướng dẫn', 'Câu chuyện khách hàng'],
      },
      {
        title: 'VỀ CHÚNG TÔI',
        links: ['Về AgileOps', 'Chuyên gia'],
      },
    ],
  },
];

function getLinkHref(link) {
  return link?.url?.href || '#';
}

function getLinkTarget(link) {
  return link?.open_in_new_tab ? '_blank' : undefined;
}

function getLinkRel(link) {
  if (!link?.open_in_new_tab && !link?.no_follow) return undefined;

  const rel = [];

  if (link?.open_in_new_tab) {
    rel.push('noopener', 'noreferrer');
  }

  if (link?.no_follow) {
    rel.push('nofollow');
  }

  return rel.join(' ');
}

function hasImage(image) {
  return Boolean(image?.src);
}

export function Component({ fieldValues }) {
  const ctaLine1 = fieldValues?.cta_line_1 || 'Sẵn sàng mua bản quyền,';
  const ctaLine2 = fieldValues?.cta_line_2 || 'triển khai phần mềm?';
  const buttonText = fieldValues?.button_text || 'Đặt lịch tư vấn';
  const buttonLink = fieldValues?.button_link || defaultButtonLink;

  const logoImage = fieldValues?.logo_image;
  const certImageLeft = fieldValues?.cert_image_left;
  const certImageRight = fieldValues?.cert_image_right;
  const socialIconUpwork = fieldValues?.social_icon_upwork;
  const socialIconLinkedin = fieldValues?.social_icon_linkedin;
  const socialIconFacebook = fieldValues?.social_icon_facebook;
  const socialIconYoutube = fieldValues?.social_icon_youtube;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>
            <span>{ctaLine1}</span>
            <span>{ctaLine2}</span>
          </h2>

          <a
            className={styles.ctaButton}
            href={getLinkHref(buttonLink)}
            target={getLinkTarget(buttonLink)}
            rel={getLinkRel(buttonLink)}
          >
            {buttonText}
          </a>
        </section>

        <div className={styles.footerBody}>
          <div className={styles.brandRow}>
            <a href="/" className={styles.brand} aria-label="AgileOps">
              {hasImage(logoImage) ? (
                <img
                  className={styles.logoImage}
                  src={logoImage.src}
                  alt={logoImage.alt || 'AgileOps logo'}
                  loading="lazy"
                />
              ) : (
                <span className={styles.logoFallback}>AgileOps</span>
              )}
            </a>

            <div className={styles.certImages}>
              {hasImage(certImageLeft) && (
                <img
                  className={styles.certImageLarge}
                  src={certImageLeft.src}
                  alt={certImageLeft.alt || ''}
                  loading="lazy"
                />
              )}

              {hasImage(certImageRight) && (
                <img
                  className={styles.certImageSmall}
                  src={certImageRight.src}
                  alt={certImageRight.alt || ''}
                  loading="lazy"
                />
              )}
            </div>
          </div>

          <nav className={styles.footerNav} aria-label="Footer navigation">
            {footerColumns.map((column, columnIndex) => {
              const isStackedColumn = column.groups.length > 1;

              return (
                <div
                  className={[
                    styles.footerColumn,
                    isStackedColumn ? styles.footerColumnStacked : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  key={`footer-column-${columnIndex}`}
                >
                  {column.groups.map((group) => (
                    <div className={styles.footerGroup} key={group.title}>
                      <h3 className={styles.columnTitle}>{group.title}</h3>

                      <ul className={styles.columnList}>
                        {group.links.map((item) => (
                          <li key={`${group.title}-${item}`}>
                            <a href="#" className={styles.columnLink}>
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            })}
          </nav>

          <div className={styles.footerBottom}>
            <div className={styles.companyInfo}>
              <p>Floor 9, Flemington Tower,</p>
              <p>182 Le Dai Hanh, Phu Tho, Ho Chi Minh City</p>
              <p>028 22222722 - 028 22222522</p>
            </div>

            <div className={styles.socials}>
              <a
                href="#"
                className={styles.socialImageLink}
                aria-label="Upwork"
              >
                {hasImage(socialIconUpwork) ? (
                  <img
                    className={styles.socialImage}
                    src={socialIconUpwork.src}
                    alt={socialIconUpwork.alt || 'Upwork'}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.socialFallback}>up</span>
                )}
              </a>

              <a
                href="#"
                className={styles.socialImageLink}
                aria-label="LinkedIn"
              >
                {hasImage(socialIconLinkedin) ? (
                  <img
                    className={styles.socialImage}
                    src={socialIconLinkedin.src}
                    alt={socialIconLinkedin.alt || 'LinkedIn'}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.socialFallback}>in</span>
                )}
              </a>

              <a
                href="#"
                className={styles.socialImageLink}
                aria-label="Facebook"
              >
                {hasImage(socialIconFacebook) ? (
                  <img
                    className={styles.socialImage}
                    src={socialIconFacebook.src}
                    alt={socialIconFacebook.alt || 'Facebook'}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.socialFallback}>f</span>
                )}
              </a>

              <a
                href="#"
                className={`${styles.socialImageLink} ${styles.socialImageLinkYoutube}`}
                aria-label="YouTube"
              >
                {hasImage(socialIconYoutube) ? (
                  <img
                    className={styles.socialImage}
                    src={socialIconYoutube.src}
                    alt={socialIconYoutube.alt || 'YouTube'}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.socialFallback}>▶</span>
                )}
              </a>
            </div>
          </div>

          <p className={styles.copyright}>
            © 2022 AGILEOPS, ALL RIGHTS RESERVED |
            <br className={styles.copyrightBreak} />
            <a href="/privacy-policy" className={styles.copyrightLink}>
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="/legals" className={styles.copyrightLink}>
              Legals
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
