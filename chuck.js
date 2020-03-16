(
    function(blocks, element, blockEditor) {
        const el = element.createElement;
        const { registerBlockType } = blocks;
        const { InnerBlocks } = blockEditor;
        const ALLOWED_BLOCKS = [
            'rosa/sylvester',
            'rosa/arnold'
        ];

        const TEMPLATE = [
            [ 'rosa/sylvester', {} ],
            [ 'rosa/arnold', {} ]
        ];

        registerBlockType(
            'rosa/chuck', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
            {
                title: 'Chuck', // Block title. __() function allows for internationalization.
                icon: 'star-empty', // Block icon from Dashicons. https://developer.wordpress.org/resource/dashicons/.
                category: 'common', // Block category. Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
                className: 'block',
                attributes: {
                },
                /*supports: {
                    customClassName: false, // prevents the possibility to enter a custom css class name to block
                    align:["wide", "full"]
                },*/

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
                    return el(InnerBlocks.Content);
                }
            }
        );
    }
)(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
)