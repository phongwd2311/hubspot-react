import { useRef, useState } from 'react';
import {
  ModuleFields,
  TextField,
  ImageField,
  LinkField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/customer-story.module.css';

export const meta = {
  label: 'AAA Customer Story',
};

const defaultDetailLink = {
  url: {
    type: 'EXTERNAL',
    href: 'https://www.agileops.vn',
  },
  open_in_new_tab: false,
  no_follow: false,
};

function getHref(link) {
  return link?.url?.href || '#';
}

function getTarget(link) {
  return link?.open_in_new_tab ? '_blank' : undefined;
}

function getRel(link) {
  return link?.open_in_new_tab ? 'noopener noreferrer' : undefined;
}

function getBackgroundStyle(image) {
  if (!image?.src) return {};

  return {
    '--story-bg-image': `url("${image.src}")`,
  };
}

function renderHeading(heading) {
  const splitToken = ' đồng hành';

  if (!heading?.includes(splitToken)) {
    return heading;
  }

  const splitIndex = heading.indexOf(splitToken);
  const firstLine = heading.slice(0, splitIndex);
  const secondLine = heading.slice(splitIndex + 1);

  return (
    <>
      {firstLine}
      <br className={styles.mobileHeadingBreak} />
      <span className={styles.desktopHeadingSpace}> </span>
      {secondLine}
    </>
  );
}

export const fields = (
  <ModuleFields>
    <TextField
      name="heading"
      label="Heading"
      default="Hơn 500 doanh nghiệp đồng hành cùng AgileOps"
    />

    <RepeatedFieldGroup
      name="stories"
      label="Customer stories"
      occurrence={{
        min: 1,
        max: 10,
        default: 1,
      }}
      default={[
        {
          quote:
            '"Trước đây, khối công nghệ dịch vụ phải phân bổ 50% thời gian để quản trị hệ thống. Nhờ chuyển đổi lên Cloud, chúng tôi có thể tập trung 100% vào phục vụ khách hàng."',
          authorName: 'Kiên Vũ',
          authorRole: 'Senior SysOps Admin, VNDirect',
          detailText: 'XEM CHI TIẾT DỰ ÁN',
          toolOneText: 'Jira',
          toolTwoText: 'AgileOps Script',
          toolThreeText: 'Confluence',
          detailLink: defaultDetailLink,
        },
      ]}
    >
      <ImageField name="backgroundImage" label="Background image" />
      <ImageField name="companyLogo" label="Company logo" />

      <TextField name="quote" label="Quote" />
      <TextField name="authorName" label="Author name" />
      <TextField name="authorRole" label="Author role" />

      <TextField
        name="detailText"
        label="Button text"
        default="XEM CHI TIẾT DỰ ÁN"
      />

      <LinkField
        name="detailLink"
        label="Button link"
        default={defaultDetailLink}
      />

      <ImageField name="toolOneIcon" label="Tool 1 icon" />
      <TextField name="toolOneText" label="Tool 1 text" default="Jira" />

      <ImageField name="toolTwoIcon" label="Tool 2 icon" />
      <TextField
        name="toolTwoText"
        label="Tool 2 text"
        default="AgileOps Script"
      />

      <ImageField name="toolThreeIcon" label="Tool 3 icon" />
      <TextField
        name="toolThreeText"
        label="Tool 3 text"
        default="Confluence"
      />
      <ImageField name="mockupImage" label="Mockup image" />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export function Component({ fieldValues = {} }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const heading =
    fieldValues.heading || 'Hơn 500 doanh nghiệp đồng hành cùng AgileOps';

  const stories = fieldValues.stories || [];

  const scrollToStory = (targetIndex) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(`.${styles.storyCard}`));
    if (!cards.length) return;

    const safeIndex = Math.min(Math.max(targetIndex, 0), cards.length - 1);
    const targetCard = cards[safeIndex];

    setActiveIndex(safeIndex);

    track.scrollTo({
      left: targetCard.offsetLeft,
      behavior: 'smooth',
    });
  };

  const scrollStories = (direction) => {
    scrollToStory(activeIndex + direction);
  };
  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(`.${styles.storyCard}`));
    if (!cards.length) return;

    const nextIndex = cards.reduce((closestIndex, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      const closestDistance = Math.abs(
        cards[closestIndex].offsetLeft - track.scrollLeft,
      );

      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);

    setActiveIndex(nextIndex);
  };

  return (
    <section className={styles.section}>
      <div className={styles.gridShell}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h2 className={styles.heading}>{renderHeading(heading)}</h2>

            {stories.length > 1 && (
              <div className={styles.controls}>
                <button
                  type="button"
                  aria-label="Previous story"
                  onClick={() => scrollStories(-1)}
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label="Next story"
                  onClick={() => scrollStories(1)}
                >
                  →
                </button>
              </div>
            )}
          </div>
          {stories.length > 1 && (
            <div
              className={styles.mobileDots}
              aria-label="Customer story pagination"
            >
              {stories.map((_, index) => (
                <button
                  type="button"
                  key={`customer-story-dot-${index}`}
                  className={`${styles.mobileDot} ${
                    activeIndex === index ? styles.mobileDotActive : ''
                  }`}
                  aria-label={`Go to customer story ${index + 1}`}
                  aria-current={activeIndex === index ? 'true' : undefined}
                  onClick={() => scrollToStory(index)}
                />
              ))}
            </div>
          )}

          <div className={styles.carousel}>
            <div
              className={styles.track}
              ref={trackRef}
              onScroll={handleTrackScroll}
            >
              {stories.map((story, index) => (
                <article
                  className={styles.storyCard}
                  style={getBackgroundStyle(story.backgroundImage)}
                  key={`customer-story-${index}`}
                >
                  <div className={styles.storyContent}>
                    {story.companyLogo?.src && (
                      <img
                        src={story.companyLogo.src}
                        alt={story.companyLogo.alt || ''}
                        className={styles.companyLogo}
                        loading="lazy"
                      />
                    )}

                    <blockquote className={styles.quote}>
                      {story.quote}
                    </blockquote>

                    <div className={styles.author}>
                      <strong>{story.authorName}</strong>
                      <span>{story.authorRole}</span>
                    </div>

                    <a
                      href={getHref(story.detailLink)}
                      target={getTarget(story.detailLink)}
                      rel={getRel(story.detailLink)}
                      className={styles.detailLink}
                    >
                      {story.detailText || 'XEM CHI TIẾT DỰ ÁN'}
                    </a>
                  </div>

                  <div className={styles.tools}>
                    <div className={styles.toolPill}>
                      {story.toolOneIcon?.src && (
                        <img
                          src={story.toolOneIcon.src}
                          alt={story.toolOneIcon.alt || ''}
                          loading="lazy"
                        />
                      )}
                      <span>{story.toolOneText}</span>
                    </div>

                    <div
                      className={`${styles.toolPill} ${styles.toolPillWide}`}
                    >
                      {story.toolTwoIcon?.src && (
                        <img
                          src={story.toolTwoIcon.src}
                          alt={story.toolTwoIcon.alt || ''}
                          loading="lazy"
                        />
                      )}
                      <span>{story.toolTwoText}</span>
                    </div>

                    <div className={styles.toolPill}>
                      {story.toolThreeIcon?.src && (
                        <img
                          src={story.toolThreeIcon.src}
                          alt={story.toolThreeIcon.alt || ''}
                          loading="lazy"
                        />
                      )}
                      <span>{story.toolThreeText}</span>
                    </div>

                    {story.mockupImage?.src && (
                      <img
                        src={story.mockupImage.src}
                        alt={story.mockupImage.alt || ''}
                        className={styles.mockupImage}
                        loading="lazy"
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
