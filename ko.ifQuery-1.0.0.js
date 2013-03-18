( function ()
{
    var
        bindingName = 'ifQuery',
        cloneNodes = function ( nodesArray, shouldCleanNodes )  /* copied directly from ko.utils, since it doesn't expose it publicly */
        {
            for ( var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++ )
            {
                var clonedNode = nodesArray[i].cloneNode( true );
                newNodesArray.push( shouldCleanNodes ? ko.cleanNode( clonedNode ) : clonedNode );
            }

            return newNodesArray;
        },
        domDataKey = '__ko_ifQueryBindingData',
        queries =
        {
            "small": "(max-width: 767px)",
            "medium-down": "(max-width: 1279px)",
            "medium": "(min-width: 768px) and (max-width: 1279px)",
            "medium-up": "(min-width: 768px)",
            "large-down": "(max-width: 1439px)",
            "large": "(min-width: 1280px) and (max-width: 1439px)",
            "large-up": "(min-width: 1280px)",
            "xlarge": "(min-width: 1440px)",
            "landscape": "(orientation: landscape)",
            "portrait": "(orientation: portrait)",
        }; /* Size definitions based on http://foundation.zurb.com/docs/components/visibility.html */

    ko.bindingHandlers[bindingName] =
    {
        'init': function ( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext )
        {
            ko.utils.domData.set( element, domDataKey, {} );

            return { 'controlsDescendantBindings': true };
        },
        'update': function ( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext )
        {
            var ifQueryData = ko.utils.domData.get( element, domDataKey ),
                dataValue = ko.utils.unwrapObservable( valueAccessor() ),
                isFirstRender = !ifQueryData.savedNodes,
                split = dataValue.split( "," ),
                finalQuery = "";

            for ( var i = 0; i < split.length; i++ )
            {
                var query = queries[split[i]] || split[i];

                finalQuery += ( finalQuery ? " and " + query : query );
            }

            finalQuery = finalQuery.replace( "only screen and", "" );

            var
                shouldDisplay = matchMedia( finalQuery ).matches,
                needsRefresh = isFirstRender || ( shouldDisplay !== ifQueryData.didDisplayOnLastUpdate );

            if ( needsRefresh )
            {
                if ( isFirstRender )
                {
                    ifQueryData.savedNodes = cloneNodes( ko.virtualElements.childNodes( element ), true /* shouldCleanNodes */ );
                }

                if ( shouldDisplay )
                {
                    if ( !isFirstRender )
                    {
                        ko.virtualElements.setDomNodeChildren( element, cloneNodes( ifQueryData.savedNodes ) );
                    }

                    ko.applyBindingsToDescendants( bindingContext, element );
                }
                else
                {
                    ko.virtualElements.emptyNode( element );
                }

                ifQueryData.didDisplayOnLastUpdate = shouldDisplay;
            }
        }
    };

    ko.expressionRewriting.bindingRewriteValidators[bindingName] = false; // Can't rewrite control flow bindings
    ko.virtualElements.allowedBindings[bindingName] = true;
} )();