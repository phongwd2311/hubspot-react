import {
  ModuleFields,
  TextField,
  ImageField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/software-partner-showcase.module.css';

export const meta = {
  label: 'AAA Software Partner Showcase',
};

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
        min: 1,
        max: 8,
        default: 6,
      }}
    >
      <ImageField name="logo" label="Logo" />
    </RepeatedFieldGroup>
  </ModuleFields>
);

function getImageAlt(image, fallback) {
  return image?.alt || image?.altText || fallback || '';
}

export function Component({ fieldValues }) {
  const { eyebrow, logos = [] } = fieldValues || {};

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.partnerBlock}>
          <p className={styles.eyebrow}>
            {eyebrow || 'ĐỐI TÁC CHÍNH THỨC CỦA'}
          </p>

          <div className={styles.logoRow}>
            {logos.map((item, index) => {
              const logo = item?.logo;

              return (
                <div className={styles.logoItem} key={index}>
                  {logo?.src ? (
                    <img
                      className={styles.logoImage}
                      src={logo.src}
                      alt={getImageAlt(logo, `Partner logo ${index + 1}`)}
                      loading="lazy"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
