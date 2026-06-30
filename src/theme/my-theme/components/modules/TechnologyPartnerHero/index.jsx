import { Island } from '@hubspot/cms-components';
import {
  ModuleFields,
  TextField,
  LinkField,
  ImageField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import ImplementationTopHeader from '../../islands/ImplementationTopHeader.jsx?island';
import styles from '../../../styles/technology-partner-hero.module.css';

import heroBgImage from '../../../assets/image/technology-partner-hero/hero-bg.png';
import headerLogoImage from '../../../assets/image/technology-partner-hero/header-logo.png';

import googleCardImage from '../../../assets/image/technology-partner-hero/google-card.png';
import atlassianCardImage from '../../../assets/image/technology-partner-hero/atlassian-card.png';
import aiCardImage from '../../../assets/image/technology-partner-hero/ai-card.png';
import salesforceCardImage from '../../../assets/image/technology-partner-hero/salesforce-card.png';
import slackCardImage from '../../../assets/image/technology-partner-hero/slack-card.png';
import heroCenterImage from '../../../assets/image/technology-partner-hero/hero-center.png';

import dropdownAtlassianImage from '../../../assets/image/technology-partner-hero/dropdown-atlassian.png';
import dropdownSalesforceImage from '../../../assets/image/technology-partner-hero/dropdown-salesforce.png';
import dropdownSlackImage from '../../../assets/image/technology-partner-hero/dropdown-slack.png';
import dropdownGoogleImage from '../../../assets/image/technology-partner-hero/dropdown-google.png';

import pricingAtlassianImage from '../../../assets/image/technology-partner-hero/pricing-atlassian.png';
import pricingSalesforceImage from '../../../assets/image/technology-partner-hero/pricing-salesforce.png';
import pricingGoogleWorkspaceImage from '../../../assets/image/technology-partner-hero/pricing-google-workspace.png';
import pricingSlackImage from '../../../assets/image/technology-partner-hero/pricing-slack.png';
import pricingGoogleAiImage from '../../../assets/image/technology-partner-hero/pricing-google-ai.png';

import serviceAtlassianImage from '../../../assets/image/technology-partner-hero/service-atlassian.png';
import serviceAiImage from '../../../assets/image/technology-partner-hero/service-ai.png';
import serviceSalesforceImage from '../../../assets/image/technology-partner-hero/service-salesforce.png';
import serviceHubspotImage from '../../../assets/image/technology-partner-hero/service-hubspot.png';
import serviceKubernetesImage from '../../../assets/image/technology-partner-hero/service-kubernetes.png';

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

const defaultImages = {
  headerLogo: createDefaultImage(headerLogoImage, 'AgileOps'),

  background: createDefaultImage(heroBgImage, ''),

  googleCard: createDefaultImage(googleCardImage, 'Google'),
  atlassianCard: createDefaultImage(atlassianCardImage, 'Atlassian'),
  aiCard: createDefaultImage(aiCardImage, 'AI'),
  salesforceCard: createDefaultImage(salesforceCardImage, 'Salesforce'),
  slackCard: createDefaultImage(slackCardImage, 'Slack'),
  heroCenter: createDefaultImage(heroCenterImage, ''),

  dropdownAtlassian: createDefaultImage(dropdownAtlassianImage, 'Atlassian'),
  dropdownSalesforce: createDefaultImage(dropdownSalesforceImage, 'Salesforce'),
  dropdownSlack: createDefaultImage(dropdownSlackImage, 'Slack'),
  dropdownGoogle: createDefaultImage(dropdownGoogleImage, 'Google'),

  pricingAtlassian: createDefaultImage(pricingAtlassianImage, 'Atlassian'),
  pricingSalesforce: createDefaultImage(pricingSalesforceImage, 'Salesforce'),
  pricingGoogleWorkspace: createDefaultImage(
    pricingGoogleWorkspaceImage,
    'Google Workspace',
  ),
  pricingSlack: createDefaultImage(pricingSlackImage, 'Slack'),
  pricingGoogleAi: createDefaultImage(pricingGoogleAiImage, 'Google AI'),

  serviceAtlassian: createDefaultImage(serviceAtlassianImage, 'Atlassian'),
  serviceAi: createDefaultImage(serviceAiImage, 'AI'),
  serviceSalesforce: createDefaultImage(serviceSalesforceImage, 'Salesforce'),
  serviceHubspot: createDefaultImage(serviceHubspotImage, 'HubSpot'),
  serviceKubernetes: createDefaultImage(serviceKubernetesImage, 'Kubernetes'),
};

const imageFieldDefaults = {
  header_logo_image: defaultImages.headerLogo,

  license_atlassian_logo: defaultImages.dropdownAtlassian,
  license_salesforce_logo: defaultImages.dropdownSalesforce,
  license_slack_logo: defaultImages.dropdownSlack,
  license_google_logo: defaultImages.dropdownGoogle,

  pricing_atlassian_logo: defaultImages.pricingAtlassian,
  pricing_salesforce_logo: defaultImages.pricingSalesforce,
  pricing_google_workspace_logo: defaultImages.pricingGoogleWorkspace,
  pricing_slack_logo: defaultImages.pricingSlack,
  pricing_google_ai_logo: defaultImages.pricingGoogleAi,

  service_atlassian_logo: defaultImages.serviceAtlassian,
  service_ai_logo: defaultImages.serviceAi,
  service_salesforce_logo: defaultImages.serviceSalesforce,
  service_hubspot_logo: defaultImages.serviceHubspot,
  service_kubernetes_logo: defaultImages.serviceKubernetes,

  background_image: defaultImages.background,

  google_card_image: defaultImages.googleCard,
  atlassian_card_image: defaultImages.atlassianCard,
  ai_card_image: defaultImages.aiCard,
  salesforce_card_image: defaultImages.salesforceCard,
  slack_card_image: defaultImages.slackCard,

  hero_center_image: defaultImages.heroCenter,
};

function mergeDefaultImages(fieldValues = {}) {
  const mergedFieldValues = { ...fieldValues };

  Object.entries(imageFieldDefaults).forEach(([fieldName, defaultImage]) => {
    mergedFieldValues[fieldName] = getImageWithDefault(
      mergedFieldValues[fieldName],
      defaultImage,
    );
  });

  return mergedFieldValues;
}

export const meta = {
  label: 'AAA Technology Partner Hero',
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
        { nav_label: 'Bản quyền', link: defaultDetailLink },
        { nav_label: 'Tính giá', link: defaultDetailLink },
        { nav_label: 'Dịch vụ', link: defaultDetailLink },
        { nav_label: 'Tài liệu', link: defaultDetailLink },
        { nav_label: 'Công ty', link: defaultDetailLink },
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

    <ImageField
      name="background_image"
      label="Hero background image 1440x871"
    />

    <TextField
      name="heading_prefix"
      label="Heading prefix"
      default="Đối tác công nghệ"
    />

    <TextField
      name="heading_highlight"
      label="Heading highlight"
      default="“ưu Việt”"
    />

    <TextField
      name="heading_suffix"
      label="Heading suffix"
      default="cho mọi doanh nghiệp"
    />

    <TextField
      name="subheading"
      label="Subheading"
      default="Đồng hành cùng 500+ khách hàng, từ mua bản quyền, đến triển khai và phát triển phần mềm"
    />

    <ImageField name="google_card_image" label="Floating card - Google" />
    <ImageField name="atlassian_card_image" label="Floating card - Atlassian" />
    <ImageField name="ai_card_image" label="Floating card - AI" />
    <ImageField
      name="salesforce_card_image"
      label="Floating card - Salesforce"
    />
    <ImageField name="slack_card_image" label="Floating card - Slack" />

    <ImageField
      name="hero_center_image"
      label="Center visual image / gray block"
    />
  </ModuleFields>
);

function getImageAlt(image, fallback) {
  return image?.alt || image?.altText || fallback || '';
}

function FloatingCard({ image, label, className }) {
  return (
    <div className={`${styles.floatingCard} ${className}`}>
      {image?.src ? (
        <img
          className={styles.floatingLogo}
          src={image.src}
          alt={getImageAlt(image, label)}
        />
      ) : (
        <span className={styles.floatingText}>{label}</span>
      )}
    </div>
  );
}

export function Component({ fieldValues }) {
  const safeFieldValues = mergeDefaultImages(fieldValues);

  const {
    background_image,

    heading_prefix,
    heading_highlight,
    heading_suffix,
    subheading,

    google_card_image,
    atlassian_card_image,
    ai_card_image,
    salesforce_card_image,
    slack_card_image,
    hero_center_image,
  } = safeFieldValues;

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        {background_image?.src ? (
          <img
            className={styles.backgroundImage}
            src={background_image.src}
            alt=""
            aria-hidden="true"
          />
        ) : null}

        <Island
          module={ImplementationTopHeader}
          fieldValues={safeFieldValues}
          hydrateOn="visible"
          wrapperClassName={styles.headerIsland}
        />

        <div className={styles.heroContent}>
          <h1 className={styles.heading}>
            <span className={`${styles.headingLine} ${styles.headingTopLine}`}>
              <span className={styles.headingPrefixText}>
                {heading_prefix || 'Đối tác công nghệ'}
              </span>

              <span className={styles.headingHighlight}>
                {heading_highlight || '“ưu Việt”'}
              </span>
            </span>

            <span
              className={`${styles.headingLine} ${styles.headingBottomLine}`}
            >
              {heading_suffix || 'cho mọi doanh nghiệp'}
            </span>
          </h1>

          <p className={styles.subheading}>
            {subheading ||
              'Đồng hành cùng 500+ khách hàng, từ mua bản quyền, đến triển khai và phát triển phần mềm'}
          </p>

          <div className={styles.visualArea} aria-hidden="true">
            <FloatingCard
              image={google_card_image}
              label="Google"
              className={styles.cardGoogle}
            />

            <FloatingCard
              image={atlassian_card_image}
              label="Atlassian"
              className={styles.cardAtlassian}
            />

            <FloatingCard
              image={ai_card_image}
              label="AI"
              className={styles.cardAi}
            />

            <FloatingCard
              image={salesforce_card_image}
              label="Salesforce"
              className={styles.cardSalesforce}
            />

            <FloatingCard
              image={slack_card_image}
              label="Slack"
              className={styles.cardSlack}
            />

            <div className={styles.centerVisual}>
              {hero_center_image?.src ? (
                <img
                  className={styles.centerVisualImage}
                  src={hero_center_image.src}
                  alt=""
                />
              ) : (
                <div className={styles.centerVisualFallback} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
