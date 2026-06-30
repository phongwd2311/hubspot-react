import { Island } from '@hubspot/cms-components';
import {
  ModuleFields,
  TextField,
  LinkField,
  ImageField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import ServiceAccordion from '../../islands/ServiceAccordion.jsx?island';
import styles from '../../../styles/implementation-services.module.css';

import backgroundImage from '../../../assets/image/implementation-services/background.png';
import verticalStemImage from '../../../assets/image/implementation-services/vertical-stem.png';
import curveLeftImage from '../../../assets/image/implementation-services/curve-left.png';
import curveRightImage from '../../../assets/image/implementation-services/curve-right.png';
import orbFrameImage from '../../../assets/image/implementation-services/orb-frame.png';

import serviceAtlassianImage from '../../../assets/image/implementation-services/service-atlassian.png';
import serviceAtlassianItsmImage from '../../../assets/image/implementation-services/service-atlassian-itsm.png';
import serviceSalesforceImage from '../../../assets/image/implementation-services/service-salesforce.png';
import serviceHubspotImage from '../../../assets/image/implementation-services/service-hubspot.png';
import serviceKubernetesImage from '../../../assets/image/implementation-services/service-kubernetes.png';
import serviceAiImage from '../../../assets/image/implementation-services/service-ai.png';

const defaultDetailLink = {
  url: {
    type: 'EXTERNAL',
    href: 'https://www.agileops.vn',
  },
  open_in_new_tab: false,
  no_follow: false,
};

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

const defaultVisualImages = {
  background: createDefaultImage(backgroundImage, ''),
  rightStem: createDefaultImage(verticalStemImage, ''),
  curveLeft: createDefaultImage(curveLeftImage, ''),
  curveRight: createDefaultImage(curveRightImage, ''),
  orbFrame: createDefaultImage(orbFrameImage, ''),
};

const defaultServiceLogoImages = [
  createDefaultImage(serviceAtlassianImage, 'Atlassian'),
  createDefaultImage(serviceAtlassianItsmImage, 'Atlassian ITSM'),
  createDefaultImage(serviceSalesforceImage, 'Salesforce'),
  createDefaultImage(serviceHubspotImage, 'HubSpot'),
  createDefaultImage(serviceKubernetesImage, 'Kubernetes'),
  createDefaultImage(serviceAiImage, 'AI'),
];

const defaultServices = [
  {
    title: 'Cắt chuyển dữ liệu Atlassian',
    point_1: 'Chuẩn hoá lộ trình migration, đảm bảo an toàn kỹ thuật',
    point_2: 'Duy trì hệ thống vận hành liên tục trong quá trình migration',
    point_3: 'Chuyển đổi dữ liệu đầy đủ, sẵn sàng hoạt động ngay trên Cloud',
    detail_link: defaultDetailLink,
  },
  {
    title: 'Thiết kế Atlassian ITSM',
    point_1: 'Thiết kế quy trình ITSM theo nhu cầu vận hành',
    point_2: 'Cấu hình request type, workflow, SLA và automation',
    point_3: 'Đào tạo đội ngũ sử dụng và vận hành hệ thống',
    detail_link: defaultDetailLink,
  },
  {
    title: 'Triển khai Salesforce',
    point_1: 'Tư vấn mô hình CRM phù hợp quy trình kinh doanh',
    point_2: 'Cấu hình pipeline, báo cáo và phân quyền người dùng',
    point_3: 'Tích hợp dữ liệu và tối ưu trải nghiệm đội sales',
    detail_link: defaultDetailLink,
  },
  {
    title: 'Phát triển website HubSpot',
    point_1: 'Thiết kế giao diện theo nhận diện thương hiệu',
    point_2: 'Xây dựng module CMS linh hoạt, dễ chỉnh sửa',
    point_3: 'Tối ưu tốc độ, SEO và trải nghiệm người dùng',
    detail_link: defaultDetailLink,
  },
  {
    title: 'Kubernetes & DevOps',
    point_1: 'Thiết kế hạ tầng container hoá ổn định',
    point_2: 'Tự động hoá CI/CD và quy trình triển khai',
    point_3: 'Giám sát, backup và tối ưu vận hành hệ thống',
    detail_link: defaultDetailLink,
  },
  {
    title: 'Triển khai AI',
    point_1: 'Tư vấn ứng dụng AI phù hợp quy trình doanh nghiệp',
    point_2: 'Tích hợp AI vào website, CRM và hệ thống nội bộ',
    point_3: 'Đào tạo đội ngũ sử dụng AI an toàn, hiệu quả',
    detail_link: defaultDetailLink,
  },
];

function mergeDefaultImages(fieldValues = {}) {
  const sourceServices =
    Array.isArray(fieldValues.services) && fieldValues.services.length > 0
      ? fieldValues.services
      : defaultServices;

  const services = sourceServices.map((service, index) => {
    const serviceDefault = defaultServices[index] || {};
    const defaultLogo =
      defaultServiceLogoImages[index] || defaultServiceLogoImages[0];

    return {
      ...serviceDefault,
      ...service,
      detail_link: service?.detail_link || serviceDefault.detail_link,
      service_logo_image: getImageWithDefault(
        service?.service_logo_image,
        defaultLogo,
      ),
    };
  });

  return {
    ...fieldValues,

    background_image: getImageWithDefault(
      fieldValues.background_image,
      defaultVisualImages.background,
    ),

    right_image: getImageWithDefault(
      fieldValues.right_image,
      defaultVisualImages.rightStem,
    ),

    visual_curve_left_image: getImageWithDefault(
      fieldValues.visual_curve_left_image,
      defaultVisualImages.curveLeft,
    ),

    visual_curve_right_image: getImageWithDefault(
      fieldValues.visual_curve_right_image,
      defaultVisualImages.curveRight,
    ),

    visual_orb_image: getImageWithDefault(
      fieldValues.visual_orb_image,
      defaultVisualImages.orbFrame,
    ),

    visual_logo_image: getImageWithDefault(
      fieldValues.visual_logo_image,
      defaultServiceLogoImages[0],
    ),

    services,
  };
}

export const meta = {
  label: 'AAA Implementation Services',
};

export const fields = (
  <ModuleFields>
    <TextField
      name="heading"
      label="Heading"
      default="Triển khai, tích hợp, vận hành phần mềm"
    />

    <RepeatedFieldGroup
      name="services"
      label="Services"
      occurrence={{
        min: 1,
        max: 8,
        default: 6,
      }}
      default={defaultServices}
    >
      <TextField name="title" label="Title" default="Service title" />
      <TextField name="point_1" label="Point 1" default="Service point 1" />
      <TextField name="point_2" label="Point 2" default="Service point 2" />
      <TextField name="point_3" label="Point 3" default="Service point 3" />

      <ImageField name="service_logo_image" label="Service logo image" />

      <LinkField
        name="detail_link"
        label="Detail link"
        default={defaultDetailLink}
      />
    </RepeatedFieldGroup>

    <ImageField name="background_image" label="Background image" />
    <ImageField name="right_image" label="Vertical stem image 29x1013" />

    <ImageField
      name="visual_curve_left_image"
      label="Left curve image 217x500"
    />

    <ImageField
      name="visual_curve_right_image"
      label="Right curve image 217x500"
    />

    <ImageField name="visual_orb_image" label="Orb frame image 224x224" />

    <ImageField name="visual_logo_image" label="Visual logo image 127x127" />
  </ModuleFields>
);

export function Component({ fieldValues }) {
  const safeFieldValues = mergeDefaultImages(fieldValues);
  const { background_image } = safeFieldValues;

  return (
    <section className={styles.section}>
      {background_image?.src ? (
        <img
          className={styles.backgroundImage}
          src={background_image.src}
          alt=""
          aria-hidden="true"
        />
      ) : null}

      <Island
        module={ServiceAccordion}
        fieldValues={safeFieldValues}
        hydrateOn="visible"
        wrapperClassName={styles.inner}
      />
    </section>
  );
}
