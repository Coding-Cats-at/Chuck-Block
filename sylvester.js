(
    function(blocks, element, blockEditor) {
        const el = element.createElement;
        const { registerBlockType } = blocks;
        const { InnerBlocks } = blockEditor;
        const ALLOWED_BLOCKS = [
            'core/heading',
            'core/paragraph'
        ];

        const TEMPLATE = [
            [ 'core/heading', {placeholder: 'Enter title...'} ],
            [ 'core/paragraph', { placeholder: 'Enter content...'}]
        ];

        registerBlockType(
            'rosa/sylvester', // Block name. Must be a string that contains a namespace prefix. Example: my-plugin/my-custom-block.
            {
                title: 'Sylvester',   // Block title
                icon: 'media-text',         // Block icon from Dashicons. https://developer.wordpress.org/resource/dashicons/.
                category: 'common',         // Block category. Groups blocks together based on common traits. E.g. common, formatting, layout widgets, embed.
                className: 'block__content',
                attributes: {
                },
                
                // Defines the block within the editor. 
                edit: function(props) {
                    return el( 
                        InnerBlocks,
                        {
                            template: TEMPLATE,
                            allowedBlocks: ALLOWED_BLOCKS,
                            templateLock: true
                        }    
                    );
                },

                // Defines the saved block. 
                save: function(props) {
                    return el(
                        'div',
                        { className: props.className },
                        el( InnerBlocks.Content )
                    );
                }
            }
        )
    }
)(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
)