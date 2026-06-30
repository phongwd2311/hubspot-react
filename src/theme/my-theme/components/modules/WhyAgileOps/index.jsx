import { Fragment, useEffect, useRef, useState } from 'react';
import {
  ModuleFields,
  TextField,
  ImageField,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/why-agileops.module.css';

import icon1DefaultImage from '../../../assets/image/why-agileops/icon-1.png';
import icon2DefaultImage from '../../../assets/image/why-agileops/icon-2.png';
import icon3DefaultImage from '../../../assets/image/why-agileops/icon-3.png';
import icon4DefaultImage from '../../../assets/image/why-agileops/icon-4.png';

export const meta = {
  label: 'Why AgileOps',
};

export const fields = (
  <ModuleFields>
    <TextField
      name="heading"
      label="Heading"
      default="Vì sao nên mua | bản quyền qua"
    />

    <TextField
      name="highlightText"
      label="Highlight text"
      default="AgileOps?"
    />

    <ImageField name="icon1" label="Icon 1" />
    <TextField name="title1" label="Title 1" default="Giá minh bạch" />
    <TextField
      name="desc1"
      label="Description 1"
      default="Bằng với giá trên website|của hãng, thanh toán VND"
    />

    <ImageField name="icon2" label="Icon 2" />
    <TextField name="title2" label="Title 2" default="Chứng từ đầy đủ" />
    <TextField
      name="desc2"
      label="Description 2"
      default="Xuất hóa đơn tài chính và|hợp đồng chuẩn pháp lý"
    />

    <ImageField name="icon3" label="Icon 3" />
    <TextField name="title3" label="Title 3" default="Xử lý thuế nhà thầu" />
    <TextField
      name="desc3"
      label="Description 3"
      default="Đội ngũ kế toán, pháp lý|đảm nhiệm toàn bộ thủ tục"
    />

    <ImageField name="icon4" label="Icon 4" />
    <TextField name="title4" label="Title 4" default="Hỗ trợ kỹ thuật" />
    <TextField
      name="desc4"
      label="Description 4"
      default="50+ kỹ sư sẵn sàng hỗ trợ|mọi yêu cầu kỹ thuật"
    />
  </ModuleFields>
);

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

const defaultIcons = [
  createDefaultImage(icon1DefaultImage, 'Giá minh bạch'),
  createDefaultImage(icon2DefaultImage, 'Chứng từ đầy đủ'),
  createDefaultImage(icon3DefaultImage, 'Xử lý thuế nhà thầu'),
  createDefaultImage(icon4DefaultImage, 'Hỗ trợ kỹ thuật'),
];

function renderTextWithBreak(text = '') {
  return text.split('|').map((line, index, array) => (
    <span key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </span>
  ));
}

function getImageAlt(image, fallback) {
  return image?.alt || image?.altText || fallback || '';
}

function getImageSrc(image) {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return image.src || image.url || '';
}

export function Component({ fieldValues = {} }) {
  const BASE_WIDTH = 1440;
  const BASE_HEIGHT = 564;

  const viewportRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!viewportRef.current) return;

      const width = viewportRef.current.clientWidth;
      const nextScale = Math.min(width / BASE_WIDTH, 1);

      setScale(Number(nextScale.toFixed(4)));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(viewportRef.current);

    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const items = [
    {
      icon: getImageWithDefault(fieldValues.icon1, defaultIcons[0]),
      title: fieldValues.title1 || 'Giá minh bạch',
      desc:
        fieldValues.desc1 ||
        'Bằng với giá trên website|của hãng, thanh toán VND',
    },
    {
      icon: getImageWithDefault(fieldValues.icon2, defaultIcons[1]),
      title: fieldValues.title2 || 'Chứng từ đầy đủ',
      desc:
        fieldValues.desc2 || 'Xuất hóa đơn tài chính và|hợp đồng chuẩn pháp lý',
    },
    {
      icon: getImageWithDefault(fieldValues.icon3, defaultIcons[2]),
      title: fieldValues.title3 || 'Xử lý thuế nhà thầu',
      desc:
        fieldValues.desc3 ||
        'Đội ngũ kế toán, pháp lý|đảm nhiệm toàn bộ thủ tục',
    },
    {
      icon: getImageWithDefault(fieldValues.icon4, defaultIcons[3]),
      title: fieldValues.title4 || 'Hỗ trợ kỹ thuật',
      desc:
        fieldValues.desc4 || '50+ kỹ sư sẵn sàng hỗ trợ|mọi yêu cầu kỹ thuật',
    },
  ];

  return (
    <section className={styles.whyAgileops}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        style={{
          height: `${BASE_HEIGHT * scale}px`,
        }}
      >
        <div
          className={styles.stage}
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <div className={styles.inner}>
            <div className={styles.left}>
              {(() => {
                const [line1 = '', line2 = ''] = (
                  fieldValues.heading || 'Vì sao nên mua | bản quyền qua'
                )
                  .split('|')
                  .map((text) => text.trim());

                return (
                  <h2 className={styles.heading}>
                    <span className={styles.headingLine}>{line1}</span>

                    <span className={styles.headingLine}>
                      {line2}{' '}
                      <span className={styles.highlight}>
                        {fieldValues.highlightText || 'AgileOps?'}
                      </span>
                    </span>
                  </h2>
                );
              })()}
            </div>

            <div className={styles.grid}>
              {items.map((item, index) => {
                const iconSrc = getImageSrc(item.icon);

                return (
                  <div className={styles.item} key={index}>
                    {iconSrc && (
                      <img
                        className={styles.icon}
                        src={iconSrc}
                        alt={getImageAlt(item.icon, item.title)}
                        loading="lazy"
                      />
                    )}

                    <h3 className={styles.title}>{item.title}</h3>

                    <p className={styles.desc}>
                      {renderTextWithBreak(item.desc)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
