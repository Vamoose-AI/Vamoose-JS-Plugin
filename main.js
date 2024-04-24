(function() {
    let scriptTag = document.querySelector('script[src="https://cdn.jsdelivr.net/gh/Vamoose-AI/Vamoose-JS-Plugin/vamoose.min.js"]');
    let organizationID = scriptTag.getAttribute('data-org-id');

    // Function to identify the current page
    function getCurrentPage() {
        try {
            // Try to access the parent's URL directly
            if (window.self !== window.top) { // Check if in an iframe
                return window.parent.location.href;
            }
        } catch (e) {
            // Access is blocked, log the error and fallback
            console.error("Error accessing window.parent.location.href:", e.message);
        }
    
        // Fallback to document.referrer if direct access fails or not in an iframe
        return document.referrer;
    }

    function loadCTA(url) {
        fetch(`https://api.vamoose.ai/cta/organization/${organizationID}?url=${url}`)
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
                console.error(`Error retrieving CTA: ${error}`);
            });
    }

    // Function to initialize the plugin
    var pluginInitialized = false;

    function initPlugin() {
        if (!pluginInitialized) {
            pluginInitialized = true;
            var currentPage = getCurrentPage();
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
