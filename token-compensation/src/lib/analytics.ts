import { supabase } from './supabase';

export const trackEvent = async (
  eventType: string,
  eventName: string,
  eventData: Record<string, unknown> = {}
) => {
  try {
    await supabase.from('analytics_events').insert({
      event_type: eventType,
      event_name: eventName,
      event_data: eventData,
      user_agent: navigator.userAgent,
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', buttonName, { location });
};

export const trackResourceDownload = (resourceName: string) => {
  trackEvent('resource_download', resourceName);
};

export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', sectionName);
};

export const trackExitIntent = () => {
  trackEvent('user_action', 'exit_intent_shown');
};
