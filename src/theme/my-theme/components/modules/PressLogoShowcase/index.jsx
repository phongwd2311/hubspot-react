import {
  ModuleFields,
  TextField,
  ImageField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/press-logo-showcase.module.css';

export const meta = {
  label: 'AAA Press Logo Showcase',
};

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
        min: 1,
        max: 8,
        default: 5,
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
  const { heading, logos = [] } = fieldValues || {};

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
            {logos.map((item, index) => {
              const logo = item?.logo;

              return (
                <div className={styles.logoItem} key={index}>
                  {logo?.src ? (
                    <img
                      className={styles.logoImage}
                      src={logo.src}
                      alt={getImageAlt(logo, `Press logo ${index + 1}`)}
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
