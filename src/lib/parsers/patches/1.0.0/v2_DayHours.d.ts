export interface V2DayHoursD {
    Id:                        string;
    Version:                   Version;
    ArtKey:                    null;
    AudioKey:                  null;
    Day:                       number;
    Hour:                      number;
    NativeItemTierProbability: number;
    SetId:                     string;
    SpawnContext:              SpawnContext;
}

export interface SpawnContext {
    $type:           SpawnContextType;
    Groups:          Group[];
    SelectionMethod: SelectionMethod;
    Limit:           Limit;
    Behaviors:       null;
}

export type SpawnContextType = "TSpawnContextQuery";

export interface Group {
    $type:           GroupType;
    Filters:         Filter[];
    SelectionMethod: SelectionMethod;
    Limit:           null;
    Prerequisites:   null;
    RandomWeight:    number;
    Behaviors:       null;
}

export type GroupType = "TSpawnGroup";

export interface Filter {
    $type: FilterType;
    Ids:   string[];
}

export type FilterType = "TSpawnFilterIdList";

export type SelectionMethod = "Random" | "Sequential";

export interface Limit {
    $type: LimitType;
    Value: number;
}

export type LimitType = "TFixedValue";

export type Version = "0.0.0";
