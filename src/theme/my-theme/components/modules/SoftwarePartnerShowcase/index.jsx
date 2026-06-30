import {
  ModuleFields,
  TextField,
  ImageField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/software-partner-showcase.module.css';

import atlassianLogoImage from '../../../assets/image/software-partner-showcase/atlassian-logo.png';
import salesforceLogoImage from '../../../assets/image/software-partner-showcase/salesforce-logo.png';
import slackLogoImage from '../../../assets/image/software-partner-showcase/slack-logo.png';
import googleLogoImage from '../../../assets/image/software-partner-showcase/google-logo.png';
import hubspotLogoImage from '../../../assets/image/software-partner-showcase/hubspot-logo.png';
import kubernetesLogoImage from '../../../assets/image/software-partner-showcase/kubernetes-logo.png';

export const meta = {
  label: 'AAA Software Partner Showcase',
};

const defaultLogoSlots = [{}, {}, {}, {}, {}, {}];

function createDefaultImage(src, alt = '') {
  return {
    src,
    alt,
    altText: alt,
  };
}

function getImageWithDefault(image, defaultImage) {
  return image?.src ? image : defaultImage;
}

function getImageAlt(image, fallback) {
  return image?.alt || image?.altText || fallback || '';
}

function getLogoImageStyle(logo) {
  const width = Number(logo?.width);
  const height = Number(logo?.height);

  if (width > 0) {
    return {
      width: `${width}px`,
      height: 'auto',
      maxWidth: 'none',
      maxHeight: 'none',
    };
  }

  if (height > 0) {
    return {
      width: 'auto',
      height: `${height}px`,
      maxWidth: 'none',
      maxHeight: 'none',
    };
  }

  return undefined;
}

const defaultPartnerLogos = [
  createDefaultImage(atlassianLogoImage, 'Atlassian'),
  createDefaultImage(salesforceLogoImage, 'Salesforce'),
  createDefaultImage(slackLogoImage, 'Slack'),
  createDefaultImage(googleLogoImage, 'Google'),
  createDefaultImage(hubspotLogoImage, 'HubSpot'),
  createDefaultImage(kubernetesLogoImage, 'Kubernetes'),
];

export const fields = (
  <ModuleFields>
    <TextField
      name="eyebrow"
      label="Eyebrow"
      default="ĐỐI TÁC CHÍNH THỨC CỦA"
    />

    <RepeatedFieldGroup
      name="logos"
      label="Partner logos"
      occurrence={{
        min: 0,
        max: 8,
        default: 6,
      }}
      default={defaultLogoSlots}
    >
      <ImageField name="logo" label="Logo" />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export function Component({ fieldValues }) {
  const { eyebrow, logos = [] } = fieldValues || {};

  const logoSourceItems = logos.length > 0 ? logos : defaultLogoSlots;

  const logoItems = logoSourceItems
    .map((item, index) => {
      const customLogo = item?.logo;
      const defaultLogo = defaultPartnerLogos[index];

      const logo = getImageWithDefault(customLogo, defaultLogo);

      return {
        logo,
        imageStyle: getLogoImageStyle(logo),
      };
    })
    .filter((item) => item.logo?.src);

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.partnerBlock}>
          <p className={styles.eyebrow}>
            {eyebrow || 'ĐỐI TÁC CHÍNH THỨC CỦA'}
          </p>

          <div className={styles.logoRow}>
            {logoItems.map((item, index) => {
              const logo = item.logo;

              return (
                <div className={styles.logoItem} key={index}>
                  <img
                    className={styles.logoImage}
                    src={logo.src}
                    alt={getImageAlt(logo, `Partner logo ${index + 1}`)}
                    loading="lazy"
                    style={item.imageStyle}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
