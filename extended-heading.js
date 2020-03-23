(
    function(element, hooks, blockEditor, components) {
        const { addFilter } = hooks;
        const el = element.createElement;
        const { InspectorControls, RichText } = blockEditor;

        const filterBlocks = (settings) => {
            if (settings.name !== 'core/heading') {
                return settings;
            }

            const newSettings = {
                ...settings,
                attributes: {
                    ...settings.attributes,
                    size: {
                        type: 'string',
                        default: 'size_normal'
                    },
                    content: {
                        type: 'string',
                        default: 'Enter title...'
                    }
                },
                edit(props) {
                    function onChangeContent(newContent) {
                        props.setAttributes({ content: newContent });
                    }

                    return [
                        // Inspector
                        el(
                            InspectorControls,
                            null,
                            el(
                                components.PanelBody,
                                {
                                    title: 'Style',
                                    initialOpen: true
                                },
                                el(
                                    components.SelectControl,
                                    {
                                        label: 'Font Size',
                                        options: [
                                            { label: 'Huge', value: 'size_huge'},
                                            { label: 'Normal', value: 'size_normal'},
                                            { label: 'Small', value: 'size_small'}
                                        ],
                                        onChange: function(value) {
                                            props.setAttributes({size: value});
                                        },
                                        value: props.attributes.size
                                    }
                                )
                            )
                        ),
                        // Content
                        el(
                            RichText, {
                                tagName: 'div',
                                format: 'string',
                                className: props.attributes.size,
                                onChange: onChangeContent,
                                value: props.attributes.content
                            }
                        )
                    ]
                },
                
                save(props) {
                    return el(
                        RichText.Content, {
                            tagName: 'div',
                            className: props.attributes.size,
                            value: props.attributes.content
                        }
                    )
                }
            }

            return newSettings;
        }

        addFilter(
            'blocks.registerBlockType',
            'rosa/extended-heading-filter',
            filterBlocks
        );
    }
)(
    window.wp.element,
    window.wp.hooks,
    window.wp.blockEditor,
    window.wp.components
)

