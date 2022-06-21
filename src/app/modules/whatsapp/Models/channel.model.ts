export interface Channel {
    accountSid:             string;
    addressSid:             null;
    addressRequirements:    string;
    apiVersion:             Date;
    beta:                   boolean;
    capabilities:           Capabilities;
    dateCreated:            Date;
    dateUpdated:            Date;
    friendlyName:           string;
    identitySid:            null;
    phoneNumber:            string;
    origin:                 string;
    sid:                    string;
    smsApplicationSid:      string;
    smsFallbackMethod:      string;
    smsFallbackUrl:         string;
    smsMethod:              string;
    smsUrl:                 string;
    statusCallback:         string;
    statusCallbackMethod:   string;
    trunkSid:               null;
    uri:                    string;
    voiceApplicationSid:    null;
    voiceCallerIdLookup:    boolean;
    voiceFallbackMethod:    string;
    voiceFallbackUrl:       null;
    voiceMethod:            string;
    voiceUrl:               string;
    emergencyStatus:        string;
    emergencyAddressSid:    null;
    emergencyAddressStatus: string;
    bundleSid:              null;
    status:                 string;
}

export interface Capabilities {
    voice: boolean;
    sms:   boolean;
    mms:   boolean;
}
