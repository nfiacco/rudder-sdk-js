import {
  AdobeAnalyticsCNameMapping,
  AdobeAnalyticsDisplayName,
  AmplitudeCNameMapping,
  AmplitudeDisplayName,
  AppcuesCNameMapping,
  AppcuesDisplayName,
  BingAdsCNameMapping,
  BingAdsDisplayName,
  BrazeCNameMapping,
  BrazeDisplayName,
  BugsnagCNameMapping,
  BugsnagDisplayName,
  ChartbeatCNameMapping,
  ChartbeatDisplayName,
  CleverTapCNameMapping,
  CleverTapDisplayName,
  ComscoreCNameMapping,
  ComscoreDisplayName,
  CriteoCNameMapping,
  CriteoDisplayName,
  CustomerIOCNameMapping,
  CustomerIODisplayName,
  DripCNameMapping,
  DripDisplayName,
  FacebookPixelCNameMapping,
  FacebookPixelDisplayName,
  FullstoryCNameMapping,
  FullstoryDisplayName,
  GACNameMapping,
  GADisplayName,
  GA4CNameMapping,
  GA4DisplayName,
  GA360CNameMapping,
  GA360DisplayName,
  GoogleAdsCNameMapping,
  GoogleAdsDisplayName,
  GoogleOptimizeCNameMapping,
  GoogleOptimizeDisplayName,
  GoogleTagManagerCNameMapping,
  GoogleTagManagerDisplayName,
  HeapCNameMapping,
  HeapDisplayName,
  HotjarCNameMapping,
  HotjarDisplayName,
  HubSpotCNameMapping,
  HubSpotDisplayName,
  IntercomCNameMapping,
  IntercomDisplayName,
  KeenCNameMapping,
  KeenDisplayName,
  KissmetricsCNameMapping,
  KissmetricsDisplayName,
  KlaviyoCNameMapping,
  KlaviyoDisplayName,
  LaunchDarklyCNameMapping,
  LaunchDarklyDisplayName,
  LinkedInInsightTagCNameMapping,
  LinkedInInsightTagDisplayName,
  LotameCNameMapping,
  LotameDisplayName,
  LyticsCNameMapping,
  LyticsDisplayName,
  MixpanelCNameMapping,
  MixpanelDisplayName,
  MoEngageCNameMapping,
  MoEngageDisplayName,
  OptimizelyCNameMapping,
  OptimizelyDisplayName,
  PendoCNameMapping,
  PendoDisplayName,
  PinterestTagCNameMapping,
  PinterestTagDisplayName,
  PostAffiliateProCNameMapping,
  PostAffiliateProDisplayName,
  PostHogCNameMapping,
  PostHogDisplayName,
  ProfitWellCNameMapping,
  ProfitWellDisplayName,
  QualtricsCNameMapping,
  QualtricsDisplayName,
  QuantumMetricCNameMapping,
  QuantumMetricDisplayName,
  RedditPixelCNameMapping,
  RedditPixelDisplayName,
  SentryCNameMapping,
  SentryDisplayName,
  SnapPixelCNameMapping,
  SnapPixelDisplayName,
  TVSquaredCNameMapping,
  TVSquaredDisplayName,
  VWOCNameMapping,
  VWODisplayName,
  AdrollCNameMapping,
  AdrollDisplayName,
  DCMFloodlightCNameMapping,
  DCMFloodlightDisplayName,
  MatomoCNameMapping,
  MatomoDisplayName,
  VeroCNameMapping,
  VeroDisplayName,
  MouseflowCNameMapping,
  MouseflowDisplayName,
  ConvertFlowCNameMapping,
  ConvertFlowDisplayName,
  SnapEngageCNameMapping,
  SnapEngageDisplayName,
  LiveChatCNameMapping,
  LiveChatDisplayName,
  ShynetCNameMapping,
  ShynetDisplayName,
  WoopraCNameMapping,
  WoopraDisplayName,
  RollBarCNameMapping,
  RollBarDisplayName,
  QuoraPixelCNameMapping,
  QuoraPixelDisplayName,
  JuneCNameMapping,
  JuneDisplayName,
  EngageCNameMapping,
  EngageDisplayName,
  IterableCNameMapping,
  IterableDisplayName,
  RockerboxCNameMapping,
  RockerboxDisplayName,
  YandexMetricaCNameMapping,
  YandexMetricaDisplayName,
  RefinerCNameMapping,
  RefinerDisplayName,
  QualarooCNameMapping,
  QualarooDisplayName,
  PodsightsCNameMapping,
  PodsightsDisplayName,
  AxeptioCNameMapping,
  AxeptioDisplayName,
  SatismeterCNameMapping,
  SatismeterDisplayName,
  MicrosoftClarityCNameMapping,
  MicrosoftClarityDisplayName,
  SendinblueCNameMapping,
  SendinblueDisplayName,
  OlarkCNameMapping,
  OlarkDisplayName,
  LemniskCNameMapping,
  LemniskDisplayName,
  TiktokAdsCNameMapping,
  TiktokAdsDisplayName,
} from './destinationNames';

const replaceValuesWithDisplayName = (
  CNameMapping: Record<string, string>,
  displayName: string,
) => {
  const updatedCNameMapping: Record<string, string> = {};
  Object.keys(CNameMapping).forEach(key => {
    updatedCNameMapping[key] = displayName;
  });
  return updatedCNameMapping;
};

// As the common names mapping in v1.1 is mapped to the definition name
// we're converting the definition name to display names temporarily
const destCNamesToDisplayNamesMap: Record<string, string> = {
  ...replaceValuesWithDisplayName(AdobeAnalyticsCNameMapping, AdobeAnalyticsDisplayName),
  ...replaceValuesWithDisplayName(AmplitudeCNameMapping, AmplitudeDisplayName),
  ...replaceValuesWithDisplayName(AppcuesCNameMapping, AppcuesDisplayName),
  ...replaceValuesWithDisplayName(BingAdsCNameMapping, BingAdsDisplayName),
  ...replaceValuesWithDisplayName(BrazeCNameMapping, BrazeDisplayName),
  ...replaceValuesWithDisplayName(BugsnagCNameMapping, BugsnagDisplayName),
  ...replaceValuesWithDisplayName(ChartbeatCNameMapping, ChartbeatDisplayName),
  ...replaceValuesWithDisplayName(CleverTapCNameMapping, CleverTapDisplayName),
  ...replaceValuesWithDisplayName(ComscoreCNameMapping, ComscoreDisplayName),
  ...replaceValuesWithDisplayName(CriteoCNameMapping, CriteoDisplayName),
  ...replaceValuesWithDisplayName(CustomerIOCNameMapping, CustomerIODisplayName),
  ...replaceValuesWithDisplayName(DripCNameMapping, DripDisplayName),
  ...replaceValuesWithDisplayName(FacebookPixelCNameMapping, FacebookPixelDisplayName),
  ...replaceValuesWithDisplayName(FullstoryCNameMapping, FullstoryDisplayName),
  ...replaceValuesWithDisplayName(GACNameMapping, GADisplayName),
  ...replaceValuesWithDisplayName(GA4CNameMapping, GA4DisplayName),
  ...replaceValuesWithDisplayName(GA360CNameMapping, GA360DisplayName),
  ...replaceValuesWithDisplayName(GoogleAdsCNameMapping, GoogleAdsDisplayName),
  ...replaceValuesWithDisplayName(GoogleOptimizeCNameMapping, GoogleOptimizeDisplayName),
  ...replaceValuesWithDisplayName(GoogleTagManagerCNameMapping, GoogleTagManagerDisplayName),
  ...replaceValuesWithDisplayName(HeapCNameMapping, HeapDisplayName),
  ...replaceValuesWithDisplayName(HotjarCNameMapping, HotjarDisplayName),
  ...replaceValuesWithDisplayName(HubSpotCNameMapping, HubSpotDisplayName),
  ...replaceValuesWithDisplayName(IntercomCNameMapping, IntercomDisplayName),
  ...replaceValuesWithDisplayName(KeenCNameMapping, KeenDisplayName),
  ...replaceValuesWithDisplayName(KissmetricsCNameMapping, KissmetricsDisplayName),
  ...replaceValuesWithDisplayName(KlaviyoCNameMapping, KlaviyoDisplayName),
  ...replaceValuesWithDisplayName(LaunchDarklyCNameMapping, LaunchDarklyDisplayName),
  ...replaceValuesWithDisplayName(LinkedInInsightTagCNameMapping, LinkedInInsightTagDisplayName),
  ...replaceValuesWithDisplayName(LotameCNameMapping, LotameDisplayName),
  ...replaceValuesWithDisplayName(LyticsCNameMapping, LyticsDisplayName),
  ...replaceValuesWithDisplayName(MixpanelCNameMapping, MixpanelDisplayName),
  ...replaceValuesWithDisplayName(MoEngageCNameMapping, MoEngageDisplayName),
  ...replaceValuesWithDisplayName(OptimizelyCNameMapping, OptimizelyDisplayName),
  ...replaceValuesWithDisplayName(PendoCNameMapping, PendoDisplayName),
  ...replaceValuesWithDisplayName(PinterestTagCNameMapping, PinterestTagDisplayName),
  ...replaceValuesWithDisplayName(PostAffiliateProCNameMapping, PostAffiliateProDisplayName),
  ...replaceValuesWithDisplayName(PostHogCNameMapping, PostHogDisplayName),
  ...replaceValuesWithDisplayName(ProfitWellCNameMapping, ProfitWellDisplayName),
  ...replaceValuesWithDisplayName(QualtricsCNameMapping, QualtricsDisplayName),
  ...replaceValuesWithDisplayName(QuantumMetricCNameMapping, QuantumMetricDisplayName),
  ...replaceValuesWithDisplayName(RedditPixelCNameMapping, RedditPixelDisplayName),
  ...replaceValuesWithDisplayName(SentryCNameMapping, SentryDisplayName),
  ...replaceValuesWithDisplayName(SnapPixelCNameMapping, SnapPixelDisplayName),
  ...replaceValuesWithDisplayName(TVSquaredCNameMapping, TVSquaredDisplayName),
  ...replaceValuesWithDisplayName(VWOCNameMapping, VWODisplayName),
  ...replaceValuesWithDisplayName(AdrollCNameMapping, AdrollDisplayName),
  ...replaceValuesWithDisplayName(DCMFloodlightCNameMapping, DCMFloodlightDisplayName),
  ...replaceValuesWithDisplayName(MatomoCNameMapping, MatomoDisplayName),
  ...replaceValuesWithDisplayName(VeroCNameMapping, VeroDisplayName),
  ...replaceValuesWithDisplayName(MouseflowCNameMapping, MouseflowDisplayName),
  ...replaceValuesWithDisplayName(ConvertFlowCNameMapping, ConvertFlowDisplayName),
  ...replaceValuesWithDisplayName(SnapEngageCNameMapping, SnapEngageDisplayName),
  ...replaceValuesWithDisplayName(LiveChatCNameMapping, LiveChatDisplayName),
  ...replaceValuesWithDisplayName(ShynetCNameMapping, ShynetDisplayName),
  ...replaceValuesWithDisplayName(WoopraCNameMapping, WoopraDisplayName),
  ...replaceValuesWithDisplayName(RollBarCNameMapping, RollBarDisplayName),
  ...replaceValuesWithDisplayName(QuoraPixelCNameMapping, QuoraPixelDisplayName),
  ...replaceValuesWithDisplayName(JuneCNameMapping, JuneDisplayName),
  ...replaceValuesWithDisplayName(EngageCNameMapping, EngageDisplayName),
  ...replaceValuesWithDisplayName(IterableCNameMapping, IterableDisplayName),
  ...replaceValuesWithDisplayName(RockerboxCNameMapping, RockerboxDisplayName),
  ...replaceValuesWithDisplayName(YandexMetricaCNameMapping, YandexMetricaDisplayName),
  ...replaceValuesWithDisplayName(RefinerCNameMapping, RefinerDisplayName),
  ...replaceValuesWithDisplayName(QualarooCNameMapping, QualarooDisplayName),
  ...replaceValuesWithDisplayName(PodsightsCNameMapping, PodsightsDisplayName),
  ...replaceValuesWithDisplayName(AxeptioCNameMapping, AxeptioDisplayName),
  ...replaceValuesWithDisplayName(SatismeterCNameMapping, SatismeterDisplayName),
  ...replaceValuesWithDisplayName(MicrosoftClarityCNameMapping, MicrosoftClarityDisplayName),
  ...replaceValuesWithDisplayName(SendinblueCNameMapping, SendinblueDisplayName),
  ...replaceValuesWithDisplayName(OlarkCNameMapping, OlarkDisplayName),
  ...replaceValuesWithDisplayName(LemniskCNameMapping, LemniskDisplayName),
  ...replaceValuesWithDisplayName(TiktokAdsCNameMapping, TiktokAdsDisplayName),
};

export { destCNamesToDisplayNamesMap };