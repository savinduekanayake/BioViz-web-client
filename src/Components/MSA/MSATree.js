import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import G6 from '@antv/g6';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tree: {
        borderWidth: 4,
        borderStyle: 'solid',
        width: 600,
        height: 400,
    },
}));

export default function MSATree(props) {
    const classes = useStyles();
    const ref = React.useRef(null);
    let graph = null;

    useEffect(() => {
        if (!graph) {
            graph = new G6.TreeGraph({
                container: ref.current,
                width: 600,
                height: 300,
                modes: {
                    default: [
                        {
                            type: 'collapse-expand',
                            onChange: function onChange(item, collapsed) {
                                const data = item.get('model').data;
                                data.collapsed = collapsed;
                                return true;
                            },
                        },
                        'drag-canvas',
                        'zoom-canvas',
                    ],
                },
                defaultNode: {
                    size: 26,
                    anchorPoints: [
                        [0, 0.5],
                        [1, 0.5],
                    ],
                    style: {
                        fill: '#FF0000',
                        stroke: '#FF0000',
                    },
                },
                defaultEdge: {
                    type: 'cubic-horizontal',
                    style: {
                        stroke: '#0000FF',
                        startArrow: true,
                    },
                },
                layout: {
                    type: 'mindmap',
                    direction: 'H',
                    getHeight: () => {
                        return 16;
                    },
                    getWidth: () => {
                        return 16;
                    },
                    getVGap: () => {
                        return 10;
                    },
                    getHGap: () => {
                        return 100;
                    },
                    getSide: () => {
                        return 'left';
                    },
                },
            });
            let centerX = 0;
            graph.node(function(node) {
                if (node.id === '1') {
                    centerX = node.x;
                }

                return {
                    label: node.id,
                    labelCfg: {
                        position:
                            node.children && node.children.length > 0 ?
                                'right' :
                                node.x > centerX ?
                                    'right' :
                                    'left',
                        offset: 5,
                        style: {
                            fill: '#0000FF',
                            fontSize: 17,
                        },
                    },
                };
            });
        }
        graph.data(props.treeData);
        graph.render();
        graph.fitView();
    }, []);

    const handleChangeData = () => {
        graph.fitView();
    };

    return (
        <div ref={ref} className={classes.tree}>
            <Button onClick={handleChangeData} type='primary'>
                Center Graph
            </Button>
        </div>
    );
};

MSATree.propTypes = {
    treeData: PropTypes.shape({
        id: PropTypes.number,
        children: PropTypes.array,
    }),
};

