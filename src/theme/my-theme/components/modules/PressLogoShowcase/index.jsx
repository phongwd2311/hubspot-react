import {
  ModuleFields,
  TextField,
  ImageField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/press-logo-showcase.module.css';

import pressLogo1Image from '../../../assets/image/press-logo-showcase/press-logo-1.png';
import pressLogo2Image from '../../../assets/image/press-logo-showcase/press-logo-2.png';
import pressLogo3Image from '../../../assets/image/press-logo-showcase/press-logo-3.png';
import pressLogo4Image from '../../../assets/image/press-logo-showcase/press-logo-4.png';
import pressLogo5Image from '../../../assets/image/press-logo-showcase/press-logo-5.png';

export const meta = {
  label: 'AAA Press Logo Showcase',
};

const defaultLogoSlots = [{}, {}, {}, {}, {}];

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

const defaultPressLogos = [
  createDefaultImage(pressLogo1Image, 'Dân Trí'),
  createDefaultImage(pressLogo2Image, 'VNExpress'),
  createDefaultImage(pressLogo3Image, 'CafeF'),
  createDefaultImage(pressLogo4Image, 'Vietnam Plus'),
  createDefaultImage(pressLogo5Image, 'TN Global'),
];

export const fields = (
  <ModuleFields>
    <TextField
      name="heading"
      label="Heading"
      default="Báo chí viết về AgileOps"
    />

    <RepeatedFieldGroup
      name="logos"
      label="Press logos"
      occurrence={{
        min: 0,
        max: 8,
        default: 5,
      }}
      default={defaultLogoSlots}
    >
      <ImageField name="logo" label="Logo" />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export function Component({ fieldValues }) {
  const { heading, logos = [] } = fieldValues || {};

  const logoSourceItems = logos.length > 0 ? logos : defaultLogoSlots;

  const logoItems = logoSourceItems
    .map((item, index) => {
      const customLogo = item?.logo;
      const defaultLogo = defaultPressLogos[index];

      return {
        logo: getImageWithDefault(customLogo, defaultLogo),
      };
    })
    .filter((item) => item.logo?.src);

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <h2 className={styles.heading}>
              {heading || 'Báo chí viết về AgileOps'}
            </h2>
          </div>

          <div className={styles.logoRow}>
            {logoItems.map((item, index) => {
              const logo = item.logo;

              return (
                <div className={styles.logoItem} key={index}>
                  <img
                    className={styles.logoImage}
                    src={logo.src}
                    alt={getImageAlt(logo, `Press logo ${index + 1}`)}
                    loading="lazy"
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
