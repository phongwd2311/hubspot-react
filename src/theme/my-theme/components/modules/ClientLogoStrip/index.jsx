import {
  ModuleFields,
  ImageField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/client-logo-strip.module.css';

export const meta = {
  label: 'AAA Client Logo Strip',
};

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      name="logos"
      label="Client logos"
      occurrence={{
        min: 1,
        max: 20,
        default: 10,
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
  const { logos = [] } = fieldValues || {};

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.logoViewport}>
          <div className={styles.logoTrack}>
            {logos.map((item, index) => {
              const logo = item?.logo;

              return (
                <div className={styles.logoItem} key={index}>
                  {logo?.src ? (
                    <img
                      className={styles.logoImage}
                      src={logo.src}
                      alt={getImageAlt(logo, `Client logo ${index + 1}`)}
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
