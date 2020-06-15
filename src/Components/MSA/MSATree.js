import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import G6 from '@antv/g6';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tree: {
        borderWidth: 2,
        borderStyle: 'solid',
        width: 600,
        height: 400,
        margin: 'auto',
    },
    sampleTree: {
        width: 600,
        height: 200,
    },
}));


/**
 * Component to view phylogenetic tree. Created with @antv/g6 package.
 * @param {Object} props - props
 * @return {React.ReactElement}
 */
export default function MSATree(props) {
    const classes = useStyles();
    const ref = React.useRef(null);
    const {treeData, setSelected} = props;
    const treeType = props.type;
    const sequencesNames = props.sequencesNames;

    /**
     * same component is used in MSA result and MSA helper dialog overlay.
     * seperating those two occasions with 'type' attribute
     */
    const htmlId = props.type === 'sample' ? 'MSA-tree-sample' :
        'MSA-tree-result';


    useEffect(() => {
        let graph = null;
        if (!graph) {
            graph = new G6.TreeGraph({
                container: ref.current,
                fitView: true,
                width: 600,
                height: treeType === 'sample' ? 200 : 400,
                modes: {
                    default: [
                        {
                            // graph can be collapsed and expanded from any node
                            type: 'collapse-expand',
                            onChange: function onChange(item, collapsed) {
                                const data = item.get('model').data;
                                data.collapsed = collapsed;
                                return true;
                            },
                        },
                        // dragging and moving is enabled in the graph
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
                        stroke: '#0000FF',
                    },
                },
                defaultEdge: {
                    type: 'cubic-horizontal',
                    style: {
                        stroke: '#FF4500',
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
                /**
                 * for input sequenced node label is the sequence name
                 * for others profile id
                 */
                let nodeLabel = node.id;
                if (treeType==='result' &&
                    Number(node.id)<=sequencesNames.length) {
                    nodeLabel = sequencesNames[Number(node.id)-1];
                }

                return {
                    label: nodeLabel,
                    labelCfg: {
                        position:
                            node.children && node.children.length > 0 ?
                                'right' :
                                node.x > centerX ?
                                    'right' :
                                    'left',
                        offset: 5,
                        style: {
                            fill: '#FF4500',
                            fontSize: 19,
                        },
                    },
                };
            });
            /**
             * view the relevent sequence/profile when
             *      mouse is hovering over a node
             */
            graph.on('node:mouseover', (e) => {
                const id = e.item.defaultCfg.id;
                setSelected(id);
            });
            /**
             * reset graph on double click on canvas
             */
            graph.on('canvas:dblclick', (e) => {
                graph.fitView(0);
            });
        }
        graph.data(treeData);
        graph.render();
        graph.fitView(0);
    }, [setSelected, treeData, treeType, sequencesNames]);

    return (
        <div ref={ref} id={htmlId} className={`${classes.tree} 
        ${props.type === 'sample' ? classes.sampleTree : ''}`}>
        </div>
    );
};

MSATree.propTypes = {
    treeData: PropTypes.shape({
        id: PropTypes.number,
        children: PropTypes.array,
    }),
    setSelected: PropTypes.func,
    type: PropTypes.string,
    sequencesNames: PropTypes.arrayOf(PropTypes.string),
};

