# ViewportLoader

ViewportLoader is an easy to use viewport event handler. It is triggered by three types of events:

* beforeviewport (triggered 200px before an element comes into viewport)
* onviewport (triggered when an element comes into viewport)
* afterviewport (triggered 200px after an element comes into viewport)

Based on the given events, it will update either:

* src
* style
* class

of the node.

## How to use

You need to include the **.js** file in your project and you are ready to go.

To have something loaded, you just need to define a data attribute, with the wanted effects. 

Here are some Examples:

```html
<img src="placeholder.jpg" data-beforeviewport-src="image.jpg" alt="" />
<div data-afterviewport-style="background: red;">I will become red</div>
<div data-onviewport-class="viewed">Mark me as viewed</div>

```

## Without IntersectionObserver

If there is no IntersectionObserver available, the events will all be triggered on page load!

