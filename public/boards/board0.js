var E348Enums = {
  Group: [ 'SIMPLEX', 'DUPLEX', 'TRIPLEX', 'KVADRUPLEX', 'Blokování souběžných jízd - 2 výtahy',
           'Blokování souběžných jízd - 3 výtahy', 'Blokování souběžných jízd - 4 výtahy'],

  XplexMode: ['Normální', 'Výchozí stanice', 'Parkování'],

  GroupCall: ['Standard', 'Master', 'Slave', 'Master + potvrzení', 'Slave + potvrzení'],

  CarCollect: ['Bez sběru', 'Sběr', 'Bez sběru + oprave', 'Sběr + oprava'],

  FloorCollect: ['Bez sběru', '1tlačítkový sběr dolů', '1tlačítkový sběr nahoru+dolů', '2tlačítkový sběr nahoru+dolů'],

  FloorCallErase: ['Vymaž vše', 'Vymaž dle směru'],

  CallConfig: ['MSP3', 'MSP3, Expander1', 'MSP3, Expander1, Expander2', 'Expander1', 'Expander1, Expander2'],

  EngineType: ['Žádný', '2-rychlostní', 'Hydraulika', 'Frekvenční měnič'],

  DoorType: ['Žádné', 'Ruční', 'Automatické', 'Poloautomatické'],

  DoorParkState: ['Zavřeno', 'Otevřeno', 'Otevřeno + zhasínání světla'],

  SafetyValveControl: ['Dolů', 'Dolů + ve hvězdě'],

  Logic: ['NE', 'ANO'],

  Outputs: [
   "NEZAPOJENO",
   "JÍZDA NAHORU",
   "JÍZDA DOLU",
   "JÍZDA RYCHLE",
   "JÍZDA POMALU",
   "ROZBĚH Y/D",
   "JÍZDA - AGREGÁT",
   "JÍZDA - ENABLE",
   "JÍZDA NAHORU/DOLU",
   "RYCHLOST - REFERENCE 0",
   "RYCHLOST - REFERENCE 1",
   "RYCHLOST - REFERENCE 2",
   "VÝSTUP AUTOEVAKUACE",
   "PŘEMOSTĚNI BEZPEČNOSTNÍHO OBVODU",
   "DVEŘE A OTEVŘI/Magnet 1",
   "DVEŘE B OTEVŘI/Magnet 1",
   "DVEŘE C OTEVŘI/Magnet 1",
   "DVEŘE A ZAVŘI/Magnet 2",
   "DVEŘE B ZAVŘI/Magnet 2",
   "DVEŘE C ZAVŘI/Magnet 2",
   "BLOKUJ Dorozumívací Zařízení",
   "SMĚROVÁ SIGNALIZACE NAHORU",
   "SMĚROVÁ SIGNALIZACE DOLU",
   "GONG",
   "KABINA VE STANICI",
   "PŘETÍŽENO",
   "MIMO PROVOZ",
   "VENTILÁTOR V KABINĚ",
   "VENTILÁTOR V ROZVÁDĚČI",
   "EVAKUACE FÁZE 1",
   "EVAKUACE FÁZE 2",
   "SVĚTLO V KABINĚ",
   "MSP2 PROTOKOL",
   "RAPID STOP",
   "KRÁTKÉ PATRO",
   "ZEMNÍ ZKRAT 48V - BEZPEČNOSTNÍ OBVOD",
   "START HLÁŠENÍ PATRA",
   "NÁKLADNÍ BLOKACE",
   "MULTIPLEX",
   "REVIZNÍ JÍZDA AKTIVOVÁNA",
   "RYCHLE NAHORU",
   "RYCHLE DOLU",
   "BEZPEČNOSTNÍ A3 VENTIL",
   "STAND-BY REŽIM",
   "ÚROVEŇ STANICE",
   "POŽADAVEK NA ŘIDIČE",
  ]
};

var Board = {
  ReadOnly: false,

  Parameters:
  [
    {
      GroupName: "Parametry P01 - Stanice",
      Parameters: [
        {Name:"P01.01", Value: 8, Type: 1, Description: "Počet stanice", Min: 2, Max: 32},
        {Name:"P01.02", Value: 0, Type: 1, Description: "Výchozí stanice", Min: 0, Max: 7},
        {Name:"P01.03", Value: 32, Type: 1, Description: "Parkovací stanice", Min: 0, Max: 32},
        {Name:"P01.04", Value: 32, Type: 1, Description: "Odstavná stanice", Min: 0, Max: 32},
        {Name:"P01.05", Value: 0, Type: 0, Description: "Dorovnávání", Enum: E348Enums.Logic},
      ]
    },
    {
      GroupName: "Parametry P02 - Řízení",
      Parameters: [
        {Name:"P02.01", Value: 0, Type: 0, Description: "Skupinové řízení", Enum: E348Enums.Group},
        {Name:"P02.02", Value: 0, Type: 0, Description: "Sběr - kabina", Enum: E348Enums.CarCollect},
        {Name:"P02.03", Value: 0, Type: 0, Description: "Sběr - stanice", Enum: E348Enums.FloorCollect},
        {Name:"P02.04", Value: 0, Type: 1, Description: "Adresa ve skupině", Min: 0, Max: 3},
        {Name:"P02.05", Value: 0, Type: 0, Description: "Konfigurace voleb", Enum: E348Enums.CallConfig},
        {Name:"P02.06", Value: 0, Type: 0, Description: "Přednostní přivolání mastera/slavea", Enum: E348Enums.GroupCall},
      ]
    },
    {
      GroupName: "Parametry P03 - Pohon",
      Parameters: [
        {Name:"P03.01", Value: 0, Type: 0, Description: "Typ pohonu", Enum: E348Enums.EngineType},
        {Name:"P03.02", Value: 35, Type: 1, Description: "Ventilace skříně při teplotě", Min: 20, Max: 50},
        {Name:"P03.03", Value: 15, Type: 1, Description: "Doba jízdy", Min: 5, Max: 80},
        {Name:"P03.04", Value: 20, Type: 1, Description: "Doba dojezdu", Min: 5, Max: 80},
      ]
    },
    {
      GroupName: "Parametry P04 - Dveře",
      Parameters: [
        {Name:"P04.01", Value: 0, Type: 0, Description: "Povolení selektivity", Enum: E348Enums.Logic},
        {Name:"P04.02", Value: 0, Type: 0, Description: "Typ dveří A", Enum: E348Enums.DoorType},
        {Name:"P04.03", Value: 0, Type: 0, Description: "Typ dveří B", Enum: E348Enums.DoorType},
        {Name:"P04.04", Value: 0, Type: 0, Description: "Typ dveří C", Enum: E348Enums.DoorType},
        {Name:"P04.05", Value: 0, Type: 0, Description: "Povolení předotevírání", Enum: E348Enums.Logic},
        {Name:"P04.06", Value: 0, Type: 0, Description: "Parkovací poloha dveří", Enum: E348Enums.DoorParkState},
        {Name:"P04.07", Value: 5, Type: 1, Description: "Čas otevřených dveří / mezi jízdami", Min: 1, Max: 20},
      ]
    },
    {
      GroupName: "Parametry P12 - Výstupy",
      Parameters: [
        {Name:"P12.01", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 1 - XA8:1,2", Enum: E348Enums.Outputs},
        {Name:"P12.02", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 2 - XA8:3,4,5", Enum: E348Enums.Outputs},
        {Name:"P12.03", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 3 - XA8:6,7,8", Enum: E348Enums.Outputs},
        {Name:"P12.04", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 4 - XA8:9,10", Enum: E348Enums.Outputs},
        {Name:"P12.05", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 5 - XA4:1,2", Enum: E348Enums.Outputs},
        {Name:"P12.06", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 6 - XA4:3,4,5", Enum: E348Enums.Outputs},
        {Name:"P12.07", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 7 - XA4:6,7,8", Enum: E348Enums.Outputs},
        {Name:"P12.08", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 8 - XA4:9,10", Enum: E348Enums.Outputs},
        {Name:"P12.09", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 9 - XA19:1,2", Enum: E348Enums.Outputs},
        {Name:"P12.10", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 10 - XA19:3,4", Enum: E348Enums.Outputs},
        {Name:"P12.11", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 11 - XA10:1", Enum: E348Enums.Outputs},
        {Name:"P12.12", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 12 - XA10:2", Enum: E348Enums.Outputs},
        {Name:"P12.13", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 13 - XA10:3", Enum: E348Enums.Outputs},
        {Name:"P12.14", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 14 - XA10:4", Enum: E348Enums.Outputs},
        {Name:"P12.15", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 15 - XA10:5", Enum: E348Enums.Outputs},
        {Name:"P12.16", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 16 - XA10:6", Enum: E348Enums.Outputs},
        {Name:"P12.17", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 17 - XA10:7", Enum: E348Enums.Outputs},
        {Name:"P12.18", Value: { Function: 0, Invert: false}, Type: 2, Description: "Výstup 18 - XA10:8", Enum: E348Enums.Outputs},
      ]
    }
  ]
};
