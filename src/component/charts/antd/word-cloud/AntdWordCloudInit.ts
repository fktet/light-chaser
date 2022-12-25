import BaseInit, {BaseInfo} from "../../interface/BaseInit";

export default class AntdWordCloudInit implements BaseInit {

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '词云图',
                type: 'AntdWordCloud'
            },
            baseStyle: {
                padding: '5px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                data: [
                    {value: 9, name: "AntV"},
                    {value: 6, name: "Layout"},
                    {value: 6, name: "Quantitative"},
                    {value: 6, name: "Relation"},
                    {value: 6, name: "Statistics"},
                    {value: 6, name: "可视化"},
                    {value: 6, name: "数据"},
                    {value: 6, name: "数据可视化"},
                    {value: 3, name: "Rename"},
                ],
                color: ['#00ff3c', '#ffaf12', '#ff6410', '#00ffd2'],
                wordField: 'name',
                weightField: 'value',
                colorField: 'name',
                autoFit: false,
                wordStyle: {
                    fontFamily: 'Verdana',
                    fontSize: [8, 32],
                    rotation: 0,
                },
                random: Math.random
            }
        };
    }


    getBaseInfo(): BaseInfo {
        return {
            name: "词云图",
            value: "AntdWordCloud",
            typeInfo: {
                name: "词云图",
                type: "wordCloud"
            },
        };
    }

}

