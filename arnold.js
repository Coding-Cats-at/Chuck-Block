(
    function(blocks, element, blockEditor) {
        const el = element.createElement;
        const { registerBlockType } = blocks;
        const { InnerBlocks } = blockEditor;
        const ALLOWED_BLOCKS = [
            'core/image',
            'core/gallery'
        ];

        const TEMPLATE = [
            ['core/image', {}]
        ];

        registerBlockType(
            'rosa/arnold', // Block name. Must be a string that contains a namespace prefix
            {
                title: 'Arnold',  // Block title
                icon: 'format-video',
                category: 'common',
                className: 'block__media',
                attributes: {},

                // Defines the block within the editor
                edit: function(props) {
                    return el( 
                        InnerBlocks,
                        {
                            template: TEMPLATE,
                            allowedBlocks: ALLOWED_BLOCKS
                        }    
                    );
                },

                // Defines the saved block
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
) (
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
)