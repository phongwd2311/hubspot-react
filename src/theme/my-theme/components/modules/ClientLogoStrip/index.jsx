import {
  ModuleFields,
  ImageField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/client-logo-strip.module.css';

import logo1Image from '../../../assets/image/client-logo-strip/press-logo-1.png';
import logo2Image from '../../../assets/image/client-logo-strip/press-logo-2.png';
import logo3Image from '../../../assets/image/client-logo-strip/press-logo-3.png';
import logo4Image from '../../../assets/image/client-logo-strip/press-logo-4.png';
import logo5Image from '../../../assets/image/client-logo-strip/press-logo-5.png';
import logo6Image from '../../../assets/image/client-logo-strip/press-logo-6.png';
import logo7Image from '../../../assets/image/client-logo-strip/press-logo-7.png';
import logo8Image from '../../../assets/image/client-logo-strip/press-logo-8.png';
import logo9Image from '../../../assets/image/client-logo-strip/press-logo-9.png';

export const meta = {
  label: 'AAA Client Logo Strip',
};

const defaultLogoSlots = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

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

const defaultClientLogos = [
  createDefaultImage(logo1Image, 'Client logo 1'),
  createDefaultImage(logo2Image, 'Client logo 2'),
  createDefaultImage(logo3Image, 'Client logo 3'),
  createDefaultImage(logo4Image, 'Client logo 4'),
  createDefaultImage(logo5Image, 'Client logo 5'),
  createDefaultImage(logo6Image, 'Client logo 6'),
  createDefaultImage(logo7Image, 'Client logo 7'),
  createDefaultImage(logo8Image, 'Client logo 8'),
  createDefaultImage(logo9Image, 'Client logo 9'),
];

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      name="logos"
      label="Client logos"
      occurrence={{
        min: 0,
        max: 20,
        default: 9,
      }}
      default={defaultLogoSlots}
    >
      <ImageField name="logo" label="Logo" />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export function Component({ fieldValues }) {
  const { logos = [] } = fieldValues || {};

  const logoSourceItems = logos.length > 0 ? logos : defaultLogoSlots;

  const logoItems = logoSourceItems
    .map((item, index) => {
      const customLogo = item?.logo;
      const defaultLogo = defaultClientLogos[index];

      return {
        logo: getImageWithDefault(customLogo, defaultLogo),
      };
    })
    .filter((item) => item.logo?.src);

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.logoViewport}>
          <div className={styles.logoTrack}>
            {logoItems.map((item, index) => {
              const logo = item.logo;

              return (
                <div className={styles.logoItem} key={index}>
                  <img
                    className={styles.logoImage}
                    src={logo.src}
                    alt={getImageAlt(logo, `Client logo ${index + 1}`)}
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
