#ko.ifQuery

A simple [knockout](https://www.knockoutjs.com) binding that enables you to conditionally display elements using Media Queries

## What it does
ko.ifQuery extends the idea of knockout's [if](http://knockoutjs.com/documentation/if-binding.html) binding to use Media Queries.  When used in conjunction with knockout templates, ko.ifQuery can also be used to selectively load different images based on screen size.

You can check out the selective image loading in the [demo](http://ifQuery.upta.me/demo.html)

## Simple sample
```
<!-- ko ifQuery: 'only screen and (max-width: 768px)' -->
<div>I'm only in the dom if the window is 768px or less</div>
<!-- /ko -->
```

## Default queries
ko.ifQuery includes a set of default query values you can use (based off the excellent Zurb Foundation [visibility styles](http://foundation.zurb.com/docs/components/visibility.html))

```
<!-- ko ifQuery: 'small' -->
<div>I'm only in the dom if 'small'</div>
<!-- /ko -->
```

 * small
 * medium-down
 * medium
 * medium-up
 * large-down
 * large-up
 * large-down
 * xlarge
 * portrait
 * landscape

## Multiple rules
You can also combine multiple rules together by comma-delimiting them.
```
<!-- ko ifQuery: 'small,landscape' -->
<div>I'm only in the dom if 'small' and in landscape</div>
<!-- /ko -->
```

## Caveats
ko.ifQuery uses the [matchMedia(http://caniuse.com/#feat=matchmedia) function, which not all browsers support.  If you want to support these browsers, you'll need to use a polyfill such as [Modernizr](http://modernizr.com/). (note: I haven't tested this myself, your mileage may vary :)
