export const sampleSequences = ['AGCTCT', 'AAAA', 'GGCTTC',
    'CCCCC', 'GGGCT', 'TTTTT'];

export const samplePairings = [[1, 2, 7],
    [3, 5, 8],
    [7, 4, 9],
    [6, 9, 10],
    [8, 10, 11]];

export const sampleGraph = {
    'children': [
        {
            'children': [
                {
                    'id': 3,
                },
                {
                    'id': 5,
                },
            ],
            'id': 8,
        },
        {
            'children': [
                {
                    'id': 6,
                },
                {
                    'children': [
                        {
                            'children': [
                                {
                                    'id': 1,
                                },
                                {
                                    'id': 2,
                                },
                            ],
                            'id': 7,
                        },
                        {
                            'id': 4,
                        },
                    ],
                    'id': 9,
                },
            ],
            'id': 10,
        },
    ],
    'id': 11,
};
