import { useRef, useState } from 'react';
import {
  ModuleFields,
  TextField,
  RepeatedFieldGroup,
  ImageField,
  LinkField,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/certi-engineers.module.css';

export const meta = {
  label: 'AAA Certified Engineers',
};

const defaultCta = {
  url: {
    type: 'EXTERNAL',
    href: 'https://www.upwork.com',
  },
  open_in_new_tab: true,
  no_follow: false,
};

const defaultLinkedinLink = {
  url: {
    type: 'EXTERNAL',
    href: 'https://www.linkedin.com',
  },
  open_in_new_tab: true,
  no_follow: false,
};

const defaultUpworkLink = {
  url: {
    type: 'EXTERNAL',
    href: 'https://www.upwork.com',
  },
  open_in_new_tab: true,
  no_follow: false,
};

function getLinkHref(link) {
  return link?.url?.href || '#';
}

function getLinkTarget(link) {
  return link?.open_in_new_tab ? '_blank' : undefined;
}

function getLinkRel(link) {
  return link?.open_in_new_tab ? 'noopener noreferrer' : undefined;
}

function UpworkIcon() {
  return <span>Up</span>;
}

const normalizeText = (value) =>
  String(value || '')
    .trim()
    .replace(/\s+/g, ' ');

const getHeadingLines = (value) => {
  const rawText = String(value || '').trim();

  if (!rawText) return [];

  const manualLines = rawText
    .split(/\s*(?:\||\n)\s*/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (manualLines.length > 1) {
    return manualLines;
  }

  if (normalizeText(rawText) === 'Đội ngũ kỹ sư chứng nhận quốc tế') {
    return ['Đội ngũ kỹ sư', 'chứng nhận quốc tế'];
  }

  return [rawText];
};

export function Component({ fieldValues = {} }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimerRef = useRef(null);

  const {
    eyebrowOne = 'GIỜ UPWORK',
    valueOne = '100.000+',
    eyebrowTwo = 'DỰ ÁN',
    valueTwo = '500+',
    eyebrowThree = 'CHỨNG CHỈ',
    valueThree = '100+',
    heading = 'Đội ngũ kỹ sư chứng nhận quốc tế',
    ctaText = 'HỢP TÁC TẠI UPWORK',
    ctaLink = defaultCta,
    linkedinIcon,
    upworkIcon,
    members = [],
  } = fieldValues;

  const headingLines = getHeadingLines(heading);

  const scrollToMember = (targetIndex) => {
    const track = trackRef.current;
    if (!track) return;

    const memberElements = Array.from(
      track.querySelectorAll(`.${styles.card}`),
    );
    if (!memberElements.length) return;

    const safeIndex = Math.min(
      Math.max(targetIndex, 0),
      memberElements.length - 1,
    );

    const targetCard = memberElements[safeIndex];

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
    scrollToMember(activeIndex + direction);
  };

  const handleTrackScroll = () => {
    if (isProgrammaticScrollRef.current) return;

    const track = trackRef.current;
    if (!track) return;

    const memberElements = Array.from(
      track.querySelectorAll(`.${styles.card}`),
    );
    if (!memberElements.length) return;

    const trackStyle = window.getComputedStyle(track);
    const paddingLeft = parseFloat(trackStyle.paddingLeft) || 0;

    const snapLeft = track.scrollLeft + paddingLeft;

    let nearestIndex = 0;
    let minDistance = Infinity;

    memberElements.forEach((card, index) => {
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

    setActiveIndex(index);
    scrollToMember(index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.gridShell}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h2 className={styles.heading}>
              {headingLines.map((line, index) => (
                <span
                  className={styles.headingLine}
                  key={`heading-line-${index}`}
                >
                  {line}
                </span>
              ))}
            </h2>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <p>{eyebrowOne}</p>
                <strong>{valueOne}</strong>
              </div>

              <div className={styles.statItem}>
                <p>{eyebrowTwo}</p>
                <strong>{valueTwo}</strong>
              </div>

              <div className={styles.statItem}>
                <p>{eyebrowThree}</p>
                <strong>{valueThree}</strong>
              </div>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <a
              className={styles.cta}
              href={getLinkHref(ctaLink)}
              target={getLinkTarget(ctaLink)}
              rel={getLinkRel(ctaLink)}
            >
              {ctaText}
            </a>
          </div>

          <div className={styles.carousel}>
            <div
              className={styles.track}
              ref={trackRef}
              onScroll={handleTrackScroll}
            >
              {members.map((member, index) => (
                <article
                  className={styles.card}
                  key={`${member.memberName || 'member'}-${index}`}
                >
                  <div className={styles.imageWrap}>
                    {member.image?.src && (
                      <img
                        src={member.image.src}
                        alt={member.image.alt || member.memberName || ''}
                        className={styles.image}
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <h3>{member.memberName}</h3>
                    <p>{member.role}</p>

                    <div className={styles.socials}>
                      {member.linkedinLink?.url?.href && (
                        <a
                          href={getLinkHref(member.linkedinLink)}
                          target={getLinkTarget(member.linkedinLink)}
                          rel={getLinkRel(member.linkedinLink)}
                          aria-label={`${member.memberName} LinkedIn`}
                        >
                          {linkedinIcon?.src && (
                            <img
                              src={linkedinIcon.src}
                              alt={linkedinIcon.alt || 'LinkedIn'}
                              className={`${styles.socialIcon} ${styles.linkedinIcon}`}
                              loading="lazy"
                            />
                          )}
                        </a>
                      )}

                      {member.upworkLink?.url?.href && (
                        <a
                          href={getLinkHref(member.upworkLink)}
                          target={getLinkTarget(member.upworkLink)}
                          rel={getLinkRel(member.upworkLink)}
                          aria-label={`${member.memberName} Upwork`}
                        >
                          {upworkIcon?.src && (
                            <img
                              src={upworkIcon.src}
                              alt={upworkIcon.alt || 'Upwork'}
                              className={`${styles.socialIcon} ${styles.upworkIcon}`}
                              loading="lazy"
                            />
                          )}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                onClick={() => scrollCards(-1)}
                aria-label="Previous member"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollCards(1)}
                aria-label="Next member"
              >
                →
              </button>
            </div>
            {members.length > 1 && (
              <div className={styles.mobileDots}>
                {members.map((_, index) => (
                  <button
                    key={`engineer-dot-${index}`}
                    className={`${styles.dot} ${
                      activeIndex === index ? styles.dotActive : ''
                    }`}
                    type="button"
                    aria-label={`Go to member ${index + 1}`}
                    onClick={(event) => handleDotClick(event, index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export const fields = (
  <ModuleFields>
    <TextField
      name="heading"
      label="Heading"
      default="Đội ngũ kỹ sư chứng nhận quốc tế"
    />

    <TextField name="eyebrowOne" label="Stat 1 Label" default="GIỜ UPWORK" />
    <TextField name="valueOne" label="Stat 1 Value" default="100.000+" />

    <TextField name="eyebrowTwo" label="Stat 2 Label" default="DỰ ÁN" />
    <TextField name="valueTwo" label="Stat 2 Value" default="500+" />

    <TextField name="eyebrowThree" label="Stat 3 Label" default="CHỨNG CHỈ" />
    <TextField name="valueThree" label="Stat 3 Value" default="100+" />

    <TextField name="ctaText" label="CTA Text" default="HỢP TÁC TẠI UPWORK" />
    <LinkField name="ctaLink" label="CTA Link" default={defaultCta} />
    <ImageField name="linkedinIcon" label="LinkedIn Icon" />
    <ImageField name="upworkIcon" label="Upwork Icon" />

    <RepeatedFieldGroup
      name="members"
      label="Team Members"
      occurrence={{
        min: 1,
        max: 12,
        default: 4,
      }}
      default={[
        {
          memberName: 'Kiet Ngo',
          role: 'CEO, founder',
          linkedinLink: defaultLinkedinLink,
          upworkLink: defaultUpworkLink,
        },
        {
          memberName: 'Duy Trương',
          role: 'COO',
          linkedinLink: defaultLinkedinLink,
          upworkLink: defaultUpworkLink,
        },
        {
          memberName: 'Thạo Vũ',
          role: 'Chuyên viên gì đó gì đó',
          linkedinLink: defaultLinkedinLink,
          upworkLink: defaultUpworkLink,
        },
        {
          memberName: 'Minh Luân',
          role: 'Chuyên viên',
          linkedinLink: defaultLinkedinLink,
          upworkLink: defaultUpworkLink,
        },
      ]}
    >
      <ImageField name="image" label="Image" />
      <TextField name="memberName" label="Name" default="Kiet Ngo" />
      <TextField name="role" label="Role" default="CEO, founder" />
      <LinkField
        name="linkedinLink"
        label="LinkedIn Link"
        default={defaultLinkedinLink}
      />
      <LinkField
        name="upworkLink"
        label="Upwork Link"
        default={defaultUpworkLink}
      />
    </RepeatedFieldGroup>
  </ModuleFields>
);
