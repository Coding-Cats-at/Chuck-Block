(
    function(blocks, editor, element, i18n, components, _) {
        const el = element.createElement;
        const { registerBlockType } = blocks;
        const { RichText, BlockControls, AlignmentToolbar, MediaUpload } = editor;

        registerBlockType(
            'rosa/chuck-block', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
            {
                title: 'Chuck Block', // Block title. __() function allows for internationalization.
                icon: 'star-empty', // Block icon from Dashicons. https://developer.wordpress.org/resource/dashicons/.
                category: 'common', // Block category. Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
                attributes: {
                    title: {
                        type: 'string',
                        selector: '.block_title'
                    },
                    content: {
                        type: 'string',
                        selector: '.block_content'
                    }
                },
                supports: {
                    customClassName: false // prevents the possibility to enter a custom css class name to block
                },

                // Defines the block within the editor. 
                edit: function(props) {
                    var attributes = props.attributes;

                    // when text in RichText component has been changed
                    function onChangeText(newText) {
                        props.setAttributes({content: newText});
                    }

                    function onChangeTitle(newTitle) {
                        props.setAttributes({title: newTitle});
                    }

                    return [
                        el(
                            'div',
                            { className: 'block_container' },
                            el(
                                RichText,
                                {
                                    tagName: 'h2',
                                    className: 'block_title',
                                    value: attributes.title,
                                    onChange: onChangeTitle,
                                    placeholder: 'Your title...'
                                }
                            ),
                            el(
                                RichText,
                                {
                                    tagName: 'p',
                                    className: 'block_content',
                                    value: attributes.content,
                                    onChange: onChangeText,
                                    placeholder: 'Your content...'
                                }
                            )
                        )
                    ]
                },

                // Defines the saved block.
                save: function(props) {
                    return el(
                        'div',
                        { className: 'block_container'},
                        el(
                            'h2',
                            { 
                                className: 'block_title'
                            },
                            props.attributes.title
                        ),
                        el( 
                            'p',
                            {
                                className: 'block_content'
                            },
                            props.attributes.content
                        )
                    );
                }
            }
        );
    }
)(
    window.wp.blocks,
    window.wp.editor,
    window.wp.element,
    window.wp.i18n,
    window.wp.components,
    window._
)