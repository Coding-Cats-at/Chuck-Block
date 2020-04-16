// https://wordpress.stackexchange.com/questions/317178/gutenberg-edit-block-inspector-controls-and-save

(
    function(element, hooks, blockEditor, components, compose, editor) {

        const el = element.createElement;
        const { Fragment } = element;
        const { InspectorControls } = blockEditor;
        const { PanelBody, SelectControl } = components;
        const { addFilter } = hooks;
        const { createHigherOrderComponent } = compose;

        const allowedBlocks = [ 'core/heading'];

        // adding the size attribute to the props
        function addAttributes(settings) {
            if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
                settings.attributes = Object.assign(settings.attributes, {
                    size: {
                        type: 'string',
                        default: 'size_normal'
                    }
                });
            }
            return settings;
        }

        // adding the option to the controls panel
        var withInspectorControlsEdit = createHigherOrderComponent( function( BlockEdit ) {
            return function( props ) {
                const { attributes, setAttributes } = props;

                return [
                    el(
                        Fragment,
                        {},
                        el( BlockEdit, props ),
                        el(
                            InspectorControls,
                            {},
                            el(
                                PanelBody,
                                {
                                    title: 'Style',
                                    initialOpen: true
                                },
                                el(
                                    SelectControl,
                                    {
                                        label: 'Font Size',
                                        options: [
                                            { label: 'Huge', value: 'size_huge'},
                                            { label: 'Normal', value: 'size_normal'},
                                            { label: 'Small', value: 'size_small'}
                                        ],
                                        onChange: function(value) {
                                            setAttributes({size: value});
                                        },
                                        value: attributes.size
                                    }
                                )
                            )
                        )
                    )
                ]
            };
        }, 'withAdvancedControls' );

        // adding the right css class in the editor
        const withClientIdClassName = createHigherOrderComponent( function(BlockListBlock) {
            return function (props) {
                var classes = "custom-heading " + props.attributes.size;
                props.setAttributes({className: classes});

                return el(
                    BlockListBlock, props
                );
            }
        }, 'withClientIdClassName');

        // adding the right css class in the frontend
        function applyExtraClass(extraProps, blockType, attributes) {
            const { size } = attributes;

            if (typeof size !== 'undefined' && allowedBlocks.includes(blockType.name)) {
                extraProps.className += " " + size;
            }
            return extraProps;
        }
        
        addFilter( 'blocks.registerBlockType', 'rosa/extended-heading-attributes', addAttributes );
        addFilter( 'editor.BlockEdit', 'rosa/extended-heading-control', withInspectorControlsEdit );
        addFilter( 'editor.BlockListBlock' , 'rosa/extended-heading-class', withClientIdClassName);
        addFilter( 'blocks.getSaveContent.extraProps', 'rosa/extended-heading-extra-class', applyExtraClass);
    }
)(
    window.wp.element,
    window.wp.hooks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.compose,
    window.wp.editor
)

