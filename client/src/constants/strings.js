export const strings = {
    MENU_ITEM_DASHBOARD: 'Úvodná stránka',
    MENU_ITEM_CUSTOMERS: 'Zákazníci',
    MENU_ITEM_FEEDBACKS: 'Spätné väzby',
    MENU_ITEM_LICENSES: 'Licencie',
    MENU_ITEM_STATISTICS: 'Štatistika',
    MENU_ITEM_USER: 'Používateľ',
    MENU_ITEM_LOGOUT: 'Odhlásiť sa',

    PAGE_NOT_FOUND: 'Not found',
    ERROR: 'Niečo sa pokazilo.',
    STATUS_OK: 'OK',

    CHART_HITS_TITLE: 'Prehľad hitov',
    CHART_DOMAINS_TITLE: 'Prehľad domén',
    CHART_FEEDBACKS_TITLE: 'Prehľad spätných väzieb',
    CHART_FEEDBACKS_TITLE_YEAR: 'Prehľad prijatých spätných väzieb',
    CHART_DEVICE_TITLE: 'Host id: ',
    CHART_MONTHS: 'Mesiace',
    CHART_KERNUN_VARIANTS_TITLE: 'Kernun varianty',
    CHART_KCW_AUTH_TITLE: 'KCW Autorizácia',
    CHART_KCW_FUNCTIONS_TITLE: 'KCW funkcie',
    CHART_PROCESSED_TITLE_YEAR: 'Prehľad spracovaných spätných väzieb',
    CHART_SALETYPE_TITLE: 'Typ predaja',
    CHART_COUNT: 'Počet',
    CHART_TOTAL: 'Celkom',

    PERIOD_TODAY: 'Dnes',
    PERIOD_WEEK: 'Týždeň',
    PERIOD_MONTH: 'Mesiac',
    PERIOD_YEAR: 'Rok',

    TOOLTIP_ACTIVE_FB : 'Aktívny užívateľ s dnešnou spätnou väzbou',
    TOOLTIP_ACTIVE_NO_FB: 'Aktívny užívateľ bez dnešnej spätnej väzby',
    TOOLTIP_INACTIVE_FB: 'Neaktívny užívateľ s dnešnou spätnou väzbou',
    TOOLTIP_INACTIVE_NO_FB: 'Neaktívny užívateľ bez dnešnej spätnej väzby',
    TOOLTIP_OTHER: 'Iné',
    TOOLTIP_FB : 'Dnes prišla spätná väzba',
    TOOLTIP_NO_FB : 'Dnes neprišla spätná väzba',
    TOOLTIP_REBOOT : 'Reštart',
    TOOLTIP_EXPIRATION: 'Exspirácia licencie',
    TOOLTIP_PANICS: 'Neprázdne n_panics',
    TOOLTIP_ABORTS: 'Neprázdne n_aborts',
    TOOLTIP_CORE_DUMPS: 'Neprázdne core_dumps',
    TOOLTIP_HIGH_REPORTER_USERS: 'reporter_users je väčšie ako devcount',
    TOOLTIP_HIGH_REPORTER_CLIENTS: 'reporter_clients je väčšie ako devcount',

    TOOLTIP_FB_FA_ID: 'Jednoznačný identifikátor záznamu spätnej väzby zariadení Kernun. ' +
                        'Je prideľovaný automaticky sekvenčne od čísla 1 pri začiatku prenosu spätnej väzby ' +
                        'zo zariadenia Kernun na server TNS. ',
    TOOLTIP_FB_UPLOAD_START: 'Čas začiatku prenosu spätnej väzby zo zariadenia Kernun na server TNS.',
    TOOLTIP_FB_UPLOAD_FINISH: 'Čas ukončenia prenosu spätnej väzby zo zariadenia Kernun na server TNS.',
    TOOLTIP_FB_PROCESSED: 'Čas spracovania spätnej väzby  pomocou aplikácie TNS SiteMarker.',
    TOOLTIP_FB_FEEDBACK_IP: 'Verejná IP adresa z ktorej bol iniciovaný prenos spätnej väzby zo zariadenia Kernun.',
    TOOLTIP_FB_FEEDBACK_HOSTNAME: 'Názov hostiteľa príslušnej verejnej IP adresy z ktorej bol iniciovaný prenos ' +
                                    'spätnej väzby zo zariadenia Kernun. Ak sa nepodarilo názov zistiť, použije sa verejná IP adresa.',
    TOOLTIP_FB_DETERMINED_CUSTOMER: 'Názov zákazníka aktuálne získavaný z licencie zariadenia Kernun. ' +
                                    'V starších záznamoch alternatívne názov hostiteľa alebo názov z tabuľky zákazníkov aplikácie TNS SiteMarker.',
    TOOLTIP_FB_FN: 'Názov súboru do ktorého bola spätná väzba zariadenia Kernun na serveri TNS uložená pred ' +
                    'spracovaním aplikáciou SiteMarker.',
    TOOLTIP_FB_HOSTID: 'Hexadecimálny identifikátor zariadenia Kernun zistený pomocou príkazu hostid.',
    TOOLTIP_FB_HOSTNAME: 'Názov hostiteľa zariadenia Kernun zistený pomocou príkazu hostname.',
    TOOLTIP_FB_KERNUN_VARIANT: 'Variant systému Kernun, ktorú používa zariadenie Kernun.',
    TOOLTIP_FB_KERNUN_VERSION: 'Verzia systému Kernun OS, ktorú používa zariadenie Kernun. ' +
                                 'Obsahuje číslo verzie, dátum vydania a platformu.',
    TOOLTIP_FB_SIZE: 'V bajtoch uvedená veľkosť komprimovaného súboru do ktorého bola spätná väzba zariadenia ' +
                     'Kernun na serveri TNS uložená.',
    TOOLTIP_FB_HITS: 'Počet HTTP požiadaviek a HTTPS spojení zaslaných zariadením Kernun ku kategorizácií ' +
                        'pomocou aplikácie SiteMarker.',
    TOOLTIP_FB_DOMAINS: 'Počet unikátnych domén zaslaných zariadením Kernun ku kategorizácií pomocou ' +
                        'aplikácie SiteMarker.',
    TOOLTIP_FB_UPTIME: 'Čas ako dlho systém Kernun OS bežal v dobe začiatku prenosu spätnej väzby zo ' +
                         'zariadenia Kernun na server TNS zistený pomocou príkazu uptime.',
    TOOLTIP_FB_DISK_SPACE: 'Informácie o zaplnení diskov zariadenia Kernun v dobe začiatku prenosu spätnej väzby zo ' +
                             'zariadenia Kernun na server TNS zistené pomocou príkazu df -lim.',
    TOOLTIP_FB_SYSTEM_TABLE: 'Informácia o otvorených popisovačoch súborov zariadenia Kernun v dobe začiatku prenosu ' +
                                'spätnej väzby zo zariadenia Kernun na server TNS zistená pomocou príkazu pstat -T.',
    TOOLTIP_FB_SWAP_SPACE: 'Informácia o využití swapového priestoru zariadenia Kernun v dobe začiatku prenosu' +
                            ' spätnej väzby zo zariadenia Kernun na server TNS zistená pomocou príkazu pstat -T.',
    TOOLTIP_FB_VM_STAT: 'Informácia o využití procesorov zariadenia Kernun v dobe začiatku prenosu spätnej väzby ' +
                        'zo zariadenia Kernun na server TNS zistená pomocou príkazu  vmstat -P.',
    TOOLTIP_FB_DMI_PRODUCT: 'Platforma respektíve produkt zariadenia Kernun podľa štandardu Desktop' +
                            ' Management Interface.',
    TOOLTIP_FB_VM_GUEST: 'Platforma virtuálneho prostredia zariadenia Kernun.',
    TOOLTIP_FB_CPU_MODEL: 'Model a takt procesorov zariadenia Kernun.',
    TOOLTIP_FB_CPU_NUMBER: 'Počet jadier procesorov zariadenia Kernun.',
    TOOLTIP_FB_REPORTER_MIN_TIME: 'Čas najstaršieho záznamu o sieťovej komunikácií v databáze Reporteru ' +
                                    'zariadenia Kernun. ',
    TOOLTIP_FB_REPORTER_MAX_TIME: 'Čas najmladšieho záznamu o sieťovej komunikácií v databáze Reporteru ' +
                                 'zariadenia Kernun.',
    TOOLTIP_FB_REPORTER_USERS: 'Počet unikátnych autentizovaných používateľov v sieťovej komunikácií za posledný ' +
                                 'ukončený týždeň v databáze Reporteru zariadenia Kernun.',
    TOOLTIP_FB_REPORTER_CLIENTS: 'Počet unikátnych IP adries klientských zariadení v sieťovej komunikácií za posledný ' +
                                    'ukončený týždeň v databáze Reporteru zariadenia Kernun.',
    TOOLTIP_FB_REPORTER_CW_CATEGORIZED: 'Počet kategorizovaných webových stránok v sieťovej komunikácií za posledný ' +
                                        'ukončený týždeň v databáze Reporteru zariadenia Kernun.',
    TOOLTIP_FB_REPORTER_CW_TOTAL: 'Počet všetkých webových stránok v sieťovej komunikácií za posledný ukončený ' +
                                    'týždeň v databáze Reporteru zariadenia Kernun.',
    TOOLTIP_FB_REPORTER_WEB_CATEGORIZED: 'Počet kategorizovaných HTTP požiadaviek a HTTPS spojení v sieťovej ' +
                                            'komunikácií za posledný ' +
                                            'ukončený týždeň v databáze Reporteru zariadenia Kernun.',
    TOOLTIP_FB_REPORTER_WEB_TOTAL: 'Počet všetkých HTTP požiadaviek a HTTPS spojení v sieťovej komunikácií za ' +
                                'posledný ukončený týždeň v databáze Reporteru zariadenia Kernun.',
    TOOLTIP_FB_N_PANICS: 'Počet zblokovaní  proxy s chybovým kódom MODM-007-X na zariadení Kernun za posledný deň.',
    TOOLTIP_FB_CORE_DUMPS: 'Výpis pamäte pri páde procesu na zariadení Kernun za posledný deň.',
    TOOLTIP_FB_RRD_PROXIES: 'Maximum paralelne spustených proxy procesov za posledný deň a limit procesov danej proxy.',
    TOOLTIP_FB_CW_DEPLOYMENT: 'Režim nasadenia zariadenia Kernun Clear Web.',
    TOOLTIP_FB_CW_DHCP_CLIENT: 'Zapnutý DHCP klient na externom rozhraní zariadenia Kernun Clear Web v režimu ' +
                                'nasadenia router.',
    TOOLTIP_FB_CW_NETIF_DEVICES: 'Názvy sieťových rozhraní zariadenia Kernun Clear Web.',
    TOOLTIP_FB_CW_TIME_ZONE: 'Časová zóna zariadenia Kernun Clear Web.',
    TOOLTIP_FB_CW_SSHD_ENABLED: 'Zapnutá vzdialená správa cez protokol SSH pre zariadenie Kernun Clear Web.',
    TOOLTIP_FB_CW_SSHD_KERNUN: 'Povolený prístup technikom TNS pre vzdialenú správu cez protokol SSH pre ' +
                                'zariadenie Kernun Clear Web.',
    TOOLTIP_FB_CW_AUTO_UPDATE: 'Zapnutá automatická príprava aktualizácie systému Kernun Clear Web.',
    TOOLTIP_FB_CW_LOG_ROTATION: 'Počet dní po ktoré sa uchovávajú záznamy o sieťovej komunikácií na zariadení ' +
                                'Kernun Clear Web.',
    TOOLTIP_FB_CW_PROXY_LANG: 'Jazyk chybových hlášok zariadenia Kernun Clear Web.',
    TOOLTIP_FB_CW_HAND_OFF: 'Nastavená nadradená proxy pre sieťovú komunikáciu zariadenia Kernun Clear Web. ',
    TOOLTIP_FB_CW_DHCP_SERVER: 'Zapnutý DHCP server na internom rozhraní zariadenia Kernun Clear Web ' +
                                'v režimu nasadenia router.',
    TOOLTIP_FB_CW_HTTPS_INSP: 'Zapnutá funkcia HTTPS inšpekcie na zariadení Kernun Clear Web.',
    TOOLTIP_FB_CW_AUTH: 'Typ autentizácie používateľov v sieťovej komunikácií na zariadení Kernun Clear Web.',
    TOOLTIP_FB_CW_ANTIVIRUS: 'Zapnutá funkcia antivírovej ochrany na zariadení Kernun Clear Web.',
    TOOLTIP_FB_N_ABORTS: 'Počet procesov ukončených pomocou signálu abort na zariadení Kernun za posledný deň.',
    TOOLTIP_FB_IDENT: 'Orientačné označenie zariadenia, pre ktoré je licenčný súbor určený.',
    TOOLTIP_FB_CUSTOMER: 'Označenie zákazníka, pre ktorého je licenčný súbor určený. ' +
                            'Obsahuje taktiež informáciu, či ide o TEST, NFR alebo EDU licenciu.',
    TOOLTIP_FB_SERIAL: 'Jedinečný identifikátor licenčného súboru.',
    TOOLTIP_FB_DEVCOUNT: 'Maximálny počet používateľov prípadne zariadení chránených zariadením Kernun podľa ' +
                            'licenčných podmienok.',
    TOOLTIP_FB_HW: 'Hexadecimálny identifikátor zariadenia Kernun zistený pomocou príkazu hostid, ' +
                    'pre ktorý je licenčný súbor platný.',
    TOOLTIP_FB_EXPIRATION: 'Dátum konca platnosti licenčného súboru. Po tomto dátume nie je možné úspešne zmeniť ' +
                             'konfiguráciu a spustiť komponenty systému. Zariadenie Kernun beží v poslednej ' +
                            'konfigurácií dokým nedôjde k výpadku alebo pokusu o reštart komponent.',
    TOOLTIP_FB_UPGRADE: 'Dátum konca nároku na nové verzie systému  a databáz podľa licenčných podmienok.',
    TOOLTIP_FB_GROUP_TYPE: 'Variant systému Kernun, ktorú používa zariadenie Kernun, pre ktorý je licenčný ' +
                            'súbor určený.',

    HEADER_ACTIVE_CUSTOMERS: 'Aktívni užívatelia',
    HEADER_INACTIVE_CUSTOMERS: 'Neaktívni užívatelia',
    HEADER_LEGEND_STATUS: 'Legenda pre status',
    HEADER_LEGEND_CUSTOMER : 'Legenda pre zákazníka',
    HEADER_LICENSE_SERIAL: 'Serial: ',
    HEADER_FB_LIST: 'Zoznam spätných väzieb',
    HEADER_FB_DETAIL: 'Detail spätnej väzby',

    TABLE_COLUMN_CUSTOMER: 'Customer',
    TABLE_COLUMN_DETERMINED_CUSTOMER: 'Determined customer',
    TABLE_COLUMN_FA_ID: 'Fa_id',
    TABLE_COLUMN_UPLOAD_START: 'Upload_start',
    TABLE_COLUMN_EXPIRATION: 'Expiration',
    TABLE_COLUMN_UPGRADE: 'Upgrade',
    TABLE_COLUMN_IDENT: 'Ident',
    TABLE_COLUMN_SERIAL: 'Serial',
    TABLE_COLUMN_HOSTNAME: 'Hostname',
    TABLE_COLUMN_FB_HOSTNAME: 'Feedback_hostname',
    TABLE_COLUMN_STATUS: 'Status',
    TABLE_COLUMN_SALE_TYPE: 'Sale',
    TABLE_COLUMN_LICENSE_TYPE: 'License',
    TABLE_COLUMN_KERNUN_VARIANT: 'Kernun variant',
    TABLE_COLUMN_KERNUN_VERSION: 'Kernun version',

    FB_DETAIL_FA_ID: 'fa_id',
    FB_DETAIL_DETERMINED_CUSTOMER: 'determined_customer',
    FB_DETAIL_DOMAINS: 'domains',
    FB_DETAIL_FB_HOSTNAME: 'feedback_hostname',
    FB_DETAIL_FB_IP: 'feedback_ip',
    FB_DETAIL_FN: 'fn',
    FB_DETAIL_HITS: 'hits',
    FB_DETAIL_SIZE: 'size',
    FB_DETAIL_PROCESSED: 'processed',
    FB_DETAIL_UPLOAD_START: 'upload_start',
    FB_DETAIL_UPLOAD_FINISH: 'upload_finish',
    FB_DETAIL_IDENT: 'ident',
    FB_DETAIL_CUSTOMER: 'customer',
    FB_DETAIL_SERIAL: 'serial',
    FB_DETAIL_DEVCOUNT: 'devcount',
    FB_DETAIL_HW: 'hw',
    FB_DETAIL_EXPIRATION: 'expiration',
    FB_DETAIL_UPGRADE: 'upgrade',
    FB_DETAIL_GROUP_TYPE: 'group_type',
    FB_DETAIL_CPU_MODEL: 'cpu_model',
    FB_DETAIL_CPU_NUMBER: 'cpu_number',
    FB_DETAIL_DMI_PRODUCT: 'dmi_product',
    FB_DETAIL_HOSTID: 'hostid',
    FB_DETAIL_HOSTNAME: 'hostname',
    FB_DETAIL_KERNUN_VARIANT: 'kernun_variant',
    FB_DETAIL_KERNUN_VERSION: 'kernun_version',
    FB_DETAIL_VM_GUEST: 'vm_guest',
    FB_DETAIL_UPTIME: 'uptime',
    FB_DETAIL_DISK_SPACE: 'disk_space',
    FB_DETAIL_SWAP_SPACE: 'swap_space',
    FB_DETAIL_SYSTEM_TABLE: 'system_table',
    FB_DETAIL_VM_STAT: 'vm_stat',
    FB_DETAIL_CORE_DUMPS: 'core_dumps',
    FB_DETAIL_RRD_PROXIES: 'rrd_proxies',
    FB_DETAIL_N_PANICS: 'n_panics',
    FB_DETAIL_N_ABORTS: 'n_aborts',
    FB_DETAIL_REP_MIN_TIME: 'reporter_min_time',
    FB_DETAIL_REP_MAX_TIME: 'reporter_max_time',
    FB_DETAIL_REP_USERS: 'reporter_users',
    FB_DETAIL_REP_CLIENTS: 'reporter_clients',
    FB_DETAIL_CW_CATEGORIZED: 'reporter_cw_categorized',
    FB_DETAIL_CW_TOTAL: 'reporter_cw_total',
    FB_DETAIL_WEB_CATEGORIZED: 'reporter_web_categorized',
    FB_DETAIL_WEB_TOTAL: 'reporter_web_total',
    FB_DETAIL_STATUS: 'Status: ',

    KCW_FUNC_DEPLOYMENT: 'cw_deployment',
    KCW_FUNC_DHCP_CLIENT: 'cw_dhcp_client',
    KCW_FUNC_NETIF_DEVICES: 'cw_netif_devices',
    KCW_FUNC_TIME_ZONE: 'cw_time_zone',
    KCW_FUNC_SSHD_ENABLED: 'cw_sshd_enabled',
    KCW_FUNC_SSHD_KERNUN: 'cw_sshd_kernun',
    KCW_FUNC_AUTO_UPDATE: 'cw_auto_update',
    KCW_FUNC_LOG_ROTATION: 'cw_log_rotation',
    KCW_FUNC_PROXY_LANG: 'cw_proxy_lang',
    KCW_FUNC_HAND_OFF: 'cw_hand_off',
    KCW_FUNC_DHCP_SERVER: 'cw_dhcp_server',
    KCW_FUNC_HTTPS_INSP: 'cw_https_insp',
    KCW_FUNC_AUTH: 'cw_auth',
    KCW_FUNC_ANTIVIRUS: 'cw_antivirus',
};