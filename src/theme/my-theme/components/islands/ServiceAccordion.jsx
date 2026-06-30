import { Fragment, useState } from 'react';
import styles from '../../styles/implementation-services.module.css';

function getLinkHref(link) {
  return link?.url?.href || '#';
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="10" />
      <path d="M8.45 13.35 4.95 9.85l1.25-1.25 2.25 2.25 5.35-5.35 1.25 1.25-6.6 6.6Z" />
    </svg>
  );
}

function renderLines(lines, keyPrefix, breakClassName) {
  return lines.map((line, index) => (
    <Fragment key={`${keyPrefix}-${line}-${index}`}>
      {line}
      {index < lines.length - 1 && (
        <br className={breakClassName || undefined} />
      )}
    </Fragment>
  ));
}

function renderDesktopPointText(point) {
  const breakBeforePhrases = ['quá trình', 'ngay trên'];

  let text = point;

  breakBeforePhrases.forEach((phrase) => {
    text = text.replace(` ${phrase}`, `\n${phrase}`);
  });

  return renderLines(text.split('\n'), 'desktop-point');
}

function renderMobilePointText(point) {
  const mobileLineMap = {
    'Chuẩn hoá lộ trình migration, đảm bảo an toàn kỹ thuật': [
      'Chuẩn hoá lộ trình migration, đảm bảo',
      'an toàn kỹ thuật',
    ],
    'Duy trì hệ thống vận hành liên tục trong quá trình migration': [
      'Duy trì hệ thống vận hành liên tục trong',
      'quá trình migration',
    ],
    'Chuyển đổi dữ liệu đầy đủ, sẵn sàng hoạt động ngay trên Cloud': [
      'Chuyển đổi dữ liệu đầy đủ, sẵn sàng',
      'hoạt động',
      'ngay trên Cloud',
    ],
  };

  const lines = mobileLineMap[point];

  if (lines) {
    return renderLines(lines, 'mobile-point', styles.mobilePointBreak);
  }

  let text = point;

  text = text
    .replace(' đảm bảo an toàn kỹ thuật', '\nđảm bảo an toàn kỹ thuật')
    .replace(' trong quá trình', '\nquá trình')
    .replace(' sẵn sàng hoạt động', '\nsẵn sàng\nhoạt động')
    .replace(' ngay trên', '\nngay trên');

  return renderLines(text.split('\n'), 'mobile-point', styles.mobilePointBreak);
}

function renderPointText(point) {
  return (
    <>
      <span className={styles.pointTextDesktop}>
        {renderDesktopPointText(point)}
      </span>
      <span className={styles.pointTextMobile}>
        {renderMobilePointText(point)}
      </span>
    </>
  );
}

function getImageCssSize(value) {
  const numberValue = Number.parseFloat(value);

  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    return undefined;
  }

  return `${numberValue}px`;
}

function getLogoImageStyle(image) {
  const width = getImageCssSize(image?.width);
  const height = getImageCssSize(image?.height);

  return {
    ...(width ? { '--visual-logo-width': width } : {}),
    ...(height ? { '--visual-logo-height': height } : {}),
  };
}

function VisualGraphic({
  className = '',
  right_image,
  visual_curve_left_image,
  visual_curve_right_image,
  visual_orb_image,
  logoImage,
  logoStyle,
}) {
  return (
    <div className={`${styles.rightVisual} ${className}`} aria-hidden="true">
      <div className={styles.visualGraphicInner}>
        {visual_curve_left_image?.src ? (
          <div
            className={`${styles.visualCurveSlot} ${styles.visualCurveLeftSlot}`}
          >
            <img
              className={styles.visualCurveImage}
              src={visual_curve_left_image.src}
              alt=""
            />
          </div>
        ) : null}

        {visual_curve_right_image?.src ? (
          <div
            className={`${styles.visualCurveSlot} ${styles.visualCurveRightSlot}`}
          >
            <img
              className={styles.visualCurveImage}
              src={visual_curve_right_image.src}
              alt=""
            />
          </div>
        ) : visual_curve_left_image?.src ? (
          <div
            className={`${styles.visualCurveSlot} ${styles.visualCurveRightSlot}`}
          >
            <img
              className={`${styles.visualCurveImage} ${styles.visualCurveMirror}`}
              src={visual_curve_left_image.src}
              alt=""
            />
          </div>
        ) : null}

        {right_image?.src ? (
          <img
            className={styles.visualStemImage}
            src={right_image.src}
            alt=""
          />
        ) : null}

        <div
          className={`${styles.visualOrb} ${
            visual_orb_image?.src
              ? styles.visualOrbWithImage
              : styles.visualOrbFallback
          }`}
        >
          {visual_orb_image?.src ? (
            <img
              className={styles.visualOrbImage}
              src={visual_orb_image.src}
              alt=""
            />
          ) : null}

          {logoImage?.src ? (
            <img
              className={styles.visualLogoImage}
              src={logoImage.src}
              alt=""
              style={logoStyle}
            />
          ) : (
            <div className={styles.visualLogo}>
              <span className={styles.logoLeft} />
              <span className={styles.logoRight} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function renderHeadingText(text) {
  const marker = ', vận hành';

  if (!text || !text.includes(marker)) {
    return text;
  }

  const [before, after] = text.split(marker);

  return (
    <>
      {before},
      <br className={styles.mobileHeadingBreak} />
      <span className={styles.desktopHeadingSpace}> </span>
      vận hành{after}
    </>
  );
}

export default function ServiceAccordion({ fieldValues }) {
  const {
    heading,
    services = [],
    right_image,
    visual_curve_left_image,
    visual_curve_right_image,
    visual_logo_image,
    visual_orb_image,
  } = fieldValues || {};

  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex] || services[0] || {};
  const activeLogoImage = activeService.service_logo_image?.src
    ? activeService.service_logo_image
    : visual_logo_image;

  const activeLogoStyle = getLogoImageStyle(activeLogoImage);

  return (
    <>
      <VisualGraphic
        className={styles.rightVisualDesktop}
        right_image={right_image}
        visual_curve_left_image={visual_curve_left_image}
        visual_curve_right_image={visual_curve_right_image}
        visual_orb_image={visual_orb_image}
        logoImage={activeLogoImage}
        logoStyle={activeLogoStyle}
      />

      <h2 className={styles.heading}>{renderHeadingText(heading)}</h2>

      <div className={styles.layout}>
        <div className={styles.accordion}>
          {services.map((service, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                key={`${service.title}-${index}`}
              >
                <button
                  type="button"
                  className={styles.itemHeader}
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                >
                  <span className={styles.itemTitle}>{service.title}</span>
                  <span
                    className={`${styles.itemIcon} ${
                      isActive ? styles.itemIconActive : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isActive && (
                  <div className={styles.panel}>
                    <VisualGraphic
                      className={styles.rightVisualMobile}
                      right_image={right_image}
                      visual_curve_left_image={visual_curve_left_image}
                      visual_curve_right_image={visual_curve_right_image}
                      visual_orb_image={visual_orb_image}
                      logoImage={activeLogoImage}
                      logoStyle={activeLogoStyle}
                    />

                    <ul className={styles.bulletList}>
                      {[service.point_1, service.point_2, service.point_3]
                        .filter(Boolean)
                        .map((point, pointIndex) => (
                          <li key={pointIndex}>
                            <span className={styles.bulletIcon}>
                              <CheckCircleIcon />
                            </span>
                            <span className={styles.bulletText}>
                              {renderPointText(point)}
                            </span>
                          </li>
                        ))}
                    </ul>

                    <a
                      className={styles.cta}
                      href={getLinkHref(service.detail_link)}
                      target={
                        service.detail_link?.open_in_new_tab
                          ? '_blank'
                          : undefined
                      }
                      rel={
                        service.detail_link?.open_in_new_tab
                          ? 'noreferrer'
                          : undefined
                      }
                    >
                      <span className={styles.ctaText}>CHI TIẾT DỊCH VỤ</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
