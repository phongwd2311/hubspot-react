import { useRef, useState } from 'react';
import {
  ModuleFields,
  TextField,
  ImageField,
  LinkField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/software-license-carousel.module.css';

export const meta = {
  label: 'AAA Software License Carousel',
};

const defaultDetailLink = {
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
      name="heading"
      label="Heading"
      default="Phân phối bản quyền phần mềm quốc tế"
    />

    <TextField
      name="subheading"
      label="Subheading"
      default="Giá niêm yết, xuất hóa đơn đầy đủ, hỗ trợ kỹ thuật bởi chuyên gia"
    />

    <RepeatedFieldGroup
      name="cards"
      label="License cards"
      occurrence={{
        min: 1,
        max: 20,
        default: 4,
      }}
      default={[
        {
          desc: 'Quản lý dự án, cộng tác và xử lý yêu cầu dịch vụ với Jira, Confluence, JSM',
          detailLink: defaultDetailLink,
        },
        {
          desc: 'CRM #1 với dữ liệu 360°, rút ngắn chu kỳ bán hàng, tăng doanh thu',
          detailLink: defaultDetailLink,
        },
        {
          desc: 'Giao tiếp theo channel, tập trung thông tin, tăng tốc phối hợp nhóm',
          detailLink: defaultDetailLink,
        },
        {
          desc: 'Giao tiếp theo thời gian thực, quản lý dữ liệu và cộng tác hiệu quả',
          detailLink: defaultDetailLink,
        },
      ]}
    >
      <ImageField name="topLogo" label="Top logo" />
      <ImageField name="mainLogo" label="Main logo" />
      <TextField
        name="desc"
        label="Description"
        default="Nội dung mô tả card"
      />
      <LinkField
        name="detailLink"
        label="Detail link"
        default={defaultDetailLink}
      />
    </RepeatedFieldGroup>
  </ModuleFields>
);

const getNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
};

const clampNumber = (value, min, max) => {
  if (!value) return null;
  return Math.min(Math.max(value, min), max);
};

const getTopLogoStyle = (image) => {
  const width = clampNumber(getNumber(image?.width), 1, 269);
  const height = clampNumber(getNumber(image?.height), 1, 94);

  const style = {};

  if (width) {
    style['--top-logo-img-width'] = `${(width / 269) * 100}%`;
    style['--top-logo-img-max'] = `${width}px`;
  }

  if (height) {
    style['--top-logo-img-height'] = `${(height / 94) * 100}%`;
  }

  return style;
};

const getMainLogoStyle = (image) => {
  const width = clampNumber(getNumber(image?.width), 1, 200);
  const height = clampNumber(getNumber(image?.height), 1, 200);

  const style = {};

  if (width) {
    style['--main-logo-width'] = `${(width / 200) * 100}%`;
    style['--main-logo-max-width'] = `${width}px`;
  }

  if (height) {
    style['--main-logo-height'] = `${(height / 200) * 100}%`;
    style['--main-logo-max-height'] = `${height}px`;
  }

  return style;
};

export function Component({ fieldValues }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimerRef = useRef(null);
  const colorClasses = [
    styles.blueCard,
    styles.cyanCard,
    styles.purpleCard,
    styles.lightCard,
  ];

  const cards = fieldValues.cards || [];

  const scrollToCard = (targetIndex) => {
    const track = trackRef.current;
    if (!track) return;

    const cardElements = Array.from(track.querySelectorAll(`.${styles.card}`));
    if (!cardElements.length) return;

    const safeIndex = Math.min(
      Math.max(targetIndex, 0),
      cardElements.length - 1,
    );

    const targetCard = cardElements[safeIndex];

    const trackStyle = window.getComputedStyle(track);
    const paddingLeft = parseFloat(trackStyle.paddingLeft) || 0;

    const targetLeft = targetCard.offsetLeft - paddingLeft;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    isProgrammaticScrollRef.current = true;
    setActiveIndex(safeIndex);

    if (scrollTimerRef.current) {
      window.clearTimeout(scrollTimerRef.current);
    }

    track.scrollTo({
      left: Math.min(Math.max(targetLeft, 0), maxScrollLeft),
      behavior: 'smooth',
    });

    scrollTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      setActiveIndex(safeIndex);
    }, 700);
  };

  const scrollCards = (direction) => {
    scrollToCard(activeIndex + direction);
  };

  const handleTrackScroll = () => {
    if (isProgrammaticScrollRef.current) return;

    const track = trackRef.current;
    if (!track) return;

    const cardElements = Array.from(track.querySelectorAll(`.${styles.card}`));
    if (!cardElements.length) return;

    const trackStyle = window.getComputedStyle(track);
    const paddingLeft = parseFloat(trackStyle.paddingLeft) || 0;

    const snapLeft = track.scrollLeft + paddingLeft;

    let nearestIndex = 0;
    let minDistance = Infinity;

    cardElements.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - snapLeft);

      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  };
  const handleDotClick = (event, index) => {
    event.preventDefault();
    event.stopPropagation();

    // đổi chấm vàng ngay lập tức
    setActiveIndex(index);

    // sau đó mới scroll card
    scrollToCard(index);
  };

  return (
    <section className={styles.licenseSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headingTitle}>{fieldValues.heading}</h2>

          <p className={styles.headingSubtitle}>{fieldValues.subheading}</p>

          <div className={styles.actions}>
            <button
              className={styles.arrowButton}
              type="button"
              aria-label="Previous"
              onClick={() => scrollCards(-1)}
            >
              <span className={styles.arrowIcon} aria-hidden="true">
                ←
              </span>
            </button>

            <button
              className={styles.arrowButton}
              type="button"
              aria-label="Next"
              onClick={() => scrollCards(1)}
            >
              <span className={styles.arrowIcon} aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>

        <div
          className={styles.track}
          ref={trackRef}
          onScroll={handleTrackScroll}
        >
          {cards.map((card, index) => (
            <article
              className={`${styles.card} ${
                colorClasses[index % colorClasses.length]
              }`}
              key={`license-card-${index}`}
            >
              <div className={styles.cardContent}>
                {card.topLogo?.src && (
                  <div
                    className={styles.topLogoBox}
                    style={getTopLogoStyle(card.topLogo)}
                  >
                    <img
                      src={card.topLogo.src}
                      alt={card.topLogo.alt || ''}
                      className={styles.topLogo}
                    />
                  </div>
                )}

                <p className={styles.desc}>{card.desc}</p>

                <a
                  href={card.detailLink?.url?.href || '#'}
                  className={styles.link}
                  target={
                    card.detailLink?.open_in_new_tab ? '_blank' : undefined
                  }
                  rel={
                    card.detailLink?.open_in_new_tab
                      ? 'noopener noreferrer'
                      : undefined
                  }
                >
                  Chi tiết bản quyền <span>→</span>
                </a>
              </div>

              {card.mainLogo?.src && (
                <div className={styles.logoFrame}>
                  <div
                    className={styles.logoCircle}
                    style={getMainLogoStyle(card.mainLogo)}
                  >
                    <img
                      src={card.mainLogo.src}
                      alt={card.mainLogo.alt || ''}
                      className={styles.mainLogo}
                    />
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
        {cards.length > 1 && (
          <div className={styles.mobileDots}>
            {cards.map((_, index) => (
              <button
                key={`license-dot-${index}`}
                className={`${styles.dot} ${
                  activeIndex === index ? styles.dotActive : ''
                }`}
                type="button"
                aria-label={`Go to card ${index + 1}`}
                onClick={(event) => handleDotClick(event, index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
