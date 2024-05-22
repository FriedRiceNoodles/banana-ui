// Inpired by https://github.com/shoelace-style/shoelace/blob/next/src/shoelace-autoloader.ts

function getBasePath(subpath = '') {
  const scripts = [...document.getElementsByTagName('script')] as HTMLScriptElement[];
  const autoloader = scripts.find((script) => script.src.includes('banana-autoloader')) as HTMLScriptElement;
  const basePath = autoloader.src.split('/').slice(0, -1).join('/');

  // Return the base path without a trailing slash. If one exists, append the subpath separated by a slash.
  return basePath.replace(/\/$/, '') + (subpath ? `/${subpath.replace(/^\//, '')}` : ``);
}

const observer = new MutationObserver((mutations) => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        void discover(node as Element);
      }
    }
  }
});

/**
 * Checks a node for undefined elements and attempts to register them.
 */
async function discover(root: Element | ShadowRoot) {
  const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : '';
  const rootIsBananaElement = rootTagName?.startsWith('b-');
  const tags = [...root.querySelectorAll(':not(:defined)')]
    .map((el) => el.tagName.toLowerCase())
    .filter((tag) => tag.startsWith('b-'));

  // If the root element is an undefined Banana component, add it to the list
  if (rootIsBananaElement && !customElements.get(rootTagName)) {
    tags.push(rootTagName);
  }

  // Make the list unique
  const tagsToRegister = [...new Set(tags)];

  await Promise.allSettled(tagsToRegister.map((tagName) => register(tagName)));
}

/**
 * Registers an element by tag name.
 */
function register(tagName: string): Promise<void> {
  // If the element is already defined, there's nothing more to do
  if (customElements.get(tagName)) {
    return Promise.resolve();
  }

  const tagWithoutPrefix = tagName.replace(/^b-/i, '');
  const path = getBasePath(`${tagWithoutPrefix}/${tagWithoutPrefix}.js`);

  // Register it
  return new Promise((resolve, reject) => {
    import(path).then(() => resolve()).catch(() => reject(new Error(`Unable to autoload <${tagName}> from ${path}`)));
  });
}

// Initial discovery
void discover(document.body);

// Listen for new undefined elements
observer.observe(document.documentElement, { subtree: true, childList: true });