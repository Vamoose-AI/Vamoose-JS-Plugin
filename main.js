(function() {
    let scriptTag = document.querySelector('script[src="../js-cta-script/main.js"]');
    let organizationID = scriptTag.getAttribute('data-org-id');

    // Function to identify the current page
    function getCurrentPage() {
        // Return absolute URL or file path
        // return window.location.href; // or use window.location.pathname for file path
        // For testing purposes, return a hardcoded URL
        // return 'https://docs.puppygraph.com/';
        return 'https://www.stackhawk.com/blog/how-does-stackhawk-work/'
    }

    function loadCTA(url) {
        fetch(`http://localhost:3030/cta/organization/${organizationID}?url=${url}`)
            .then(response => response.json())
            .then(data => {
                // Create the ctaContainer div
                var ctaContainer = document.createElement('div');
                ctaContainer.id = 'ctaContainer';
                ctaContainer.innerHTML = data.html;

                // Append the ctaContainer div to the end of the HTML document
                document.body.appendChild(ctaContainer);

                // Load CSS
                var styleElement = document.createElement('style');
                styleElement.innerHTML = data.css;
                document.head.appendChild(styleElement);

                // Load JavaScript
                var scriptElement = document.createElement('script');
                scriptElement.textContent = `${data.js}`;
                document.body.appendChild(scriptElement);

                // // Call the function to initialize the plugin
                initPlugin();
            })
            .catch(error => {
                console.error('Error retrieving CTA:', error);
            });
    }

    // Function to initialize the plugin
    var pluginInitialized = false;

    function initPlugin() {
        if (!pluginInitialized) {
            pluginInitialized = true;
            var currentPage = getCurrentPage();
            console.log("Current Page:", currentPage);
            loadCTA(currentPage);
        }
    }

    // Initialize the plugin after the DOM is fully loaded
    if (document.readyState === "loading") { 
        document.addEventListener("DOMContentLoaded", initPlugin);
    } else { 
        initPlugin();
    }
})();
