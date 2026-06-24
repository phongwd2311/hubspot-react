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

const defaultDetailLink = {
  url: {
    type: 'EXTERNAL',
    href: 'https://www.agileops.vn',
  },
  open_in_new_tab: false,
  no_follow: false,
};

export const meta = {
  label: 'AAA Implementation Services',
};

export const fields = (
  <ModuleFields>
    <ImageField name="header_logo_image" label="Header logo image" />
    <ImageField
      name="license_atlassian_logo"
      label="Dropdown logo - Atlassian"
    />

    <ImageField
      name="license_salesforce_logo"
      label="Dropdown logo - Salesforce"
    />

    <ImageField name="license_slack_logo" label="Dropdown logo - Slack" />

    <ImageField name="license_google_logo" label="Dropdown logo - Google" />
    <ImageField
      name="pricing_atlassian_logo"
      label="Pricing logo - Atlassian"
    />

    <ImageField
      name="pricing_salesforce_logo"
      label="Pricing logo - Salesforce"
    />

    <ImageField
      name="pricing_google_workspace_logo"
      label="Pricing logo - Google Workspace"
    />

    <ImageField name="pricing_slack_logo" label="Pricing logo - Slack" />

    <ImageField
      name="pricing_google_ai_logo"
      label="Pricing logo - Google AI"
    />
    <ImageField
      name="service_atlassian_logo"
      label="Service dropdown logo - Atlassian"
    />

    <ImageField name="service_ai_logo" label="Service dropdown logo - AI" />

    <ImageField
      name="service_salesforce_logo"
      label="Service dropdown logo - Salesforce"
    />

    <ImageField
      name="service_hubspot_logo"
      label="Service dropdown logo - HubSpot"
    />

    <ImageField
      name="service_kubernetes_logo"
      label="Service dropdown logo - Kubernetes"
    />
    <RepeatedFieldGroup
      name="header_links"
      label="Header links"
      occurrence={{
        min: 1,
        max: 6,
        default: 5,
      }}
      default={[
        {
          nav_label: 'Bản quyền',
          link: defaultDetailLink,
        },
        {
          nav_label: 'Tính giá',
          link: defaultDetailLink,
        },
        {
          nav_label: 'Dịch vụ',
          link: defaultDetailLink,
        },
        {
          nav_label: 'Tài liệu',
          link: defaultDetailLink,
        },
        {
          nav_label: 'Công ty',
          link: defaultDetailLink,
        },
      ]}
    >
      <TextField name="nav_label" label="Label" default="Menu item" />
      <LinkField name="link" label="Link" default={defaultDetailLink} />
    </RepeatedFieldGroup>

    <TextField name="contact_label" label="Contact label" default="LIÊN HỆ" />

    <LinkField
      name="contact_link"
      label="Contact link"
      default={defaultDetailLink}
    />
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
      default={[
        {
          title: 'Cắt chuyển dữ liệu Atlassian',
          point_1: 'Chuẩn hoá lộ trình migration, đảm bảo an toàn kỹ thuật',
          point_2:
            'Duy trì hệ thống vận hành liên tục trong quá trình migration',
          point_3:
            'Chuyển đổi dữ liệu đầy đủ, sẵn sàng hoạt động ngay trên Cloud',
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
      ]}
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

    <ImageField name="visual_logo_image" label="Atlassian logo image 127x127" />
  </ModuleFields>
);

export function Component({ fieldValues }) {
  const { background_image } = fieldValues || {};

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
        fieldValues={fieldValues}
        hydrateOn="visible"
        wrapperClassName={styles.inner}
      />
    </section>
  );
}
