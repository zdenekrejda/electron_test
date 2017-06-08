
var E248Enums = {
  Inversion: [ 'Spínací kontakt', 'Rozpínací kontakt'],

  Signalisation: [ '1 z N', '7-segmentový 2-ciferný', '7-segmentový 1-ciferný', '1 z N', 'Uživatelsky definovaný'],

  SensorLogic: [
    'XA7:4 - A, XA5:8 - A, XA9:1,2 - A',
    'XA7:4 - A, XA5:8 - D, XA9:1,2 - A',
    'XA7:4 - A, XA5:8 - A, XA9:1,2 - D',
    'XA7:4 - A, XA5:8 - D, XA9:1,2 - D',
    'XA7:4 - D, XA5:8 - A, XA9:1,2 - A',
    'XA7:4 - D, XA5:8 - A, XA9:1,2 - D',
    'XA7:4 - D, XA5:8 - D, XA9:1,2 - A',
    'XA7:4 - D, XA5:8 - D, XA9:1,2 - D',
  ],

  DirectionSignalisation: [
    'V jízdě - svit, ve stanici - svit',
    'V jízdě - svit, příští jízda - bliká',
    'V jízdě - bliká, ve stanici - svit',
    'V jízdě - bliká, příští jízda - svit',
    'Pouze příští jízda - svit',
    'Pouze příští jízda - bliká',
  ],
};

var Board = {
  ReadOnly: true,

  Parameters:
  [
    {
      GroupName: "Parametry řízení",
      Parameters: [
        {Name:"P01", Value: 8, Type: 1, Description: "Počet stanic", Min: 2, Max: 24},
        {Name:"P02", Value: 0, Type: 1, Description: "Výchozí stanice", Min: 0, Max: 7},
        {Name:"P03", Value: 24, Type: 1, Description: "Parkovací stanice", Min: 0, Max: 24},
        {Name:"P04", Value: 0, Type: 0, Description: "Typ externí polohové signalizace", Enum: E248Enums.Signalisation},
        {Name:"P05", Value: 0, Type: 0, Description: "Logika vstupů od snímačů polohy", Enum: E248Enums.SensorLogic},
        {Name:"P06", Value: 0, Type: 0, Description: "Typ signalizace směru jízdy", Enum: E248Enums.DirectionSignalisation},
        {Name:"P07", Value: 0, Type: 0, Description: "Typ snínače zatížení kabiny (15kg)", Enum: E248Enums.Inversion},
        {Name:"P08", Value: 0, Type: 0, Description: "Typ snímače plného zatížení kabiny", Enum: E248Enums.Inversion},
        {Name:"P09", Value: 0, Type: 0, Description: "Typ snímače přetížení kabiny", Enum: E248Enums.Inversion},
      ]
    }
  ]
};
