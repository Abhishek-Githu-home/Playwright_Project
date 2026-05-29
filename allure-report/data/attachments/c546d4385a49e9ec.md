# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Test04_E2E-orderplacing.spec.js >> Positive flow for E2E eCommerce order placing
- Location: tests\Test04_E2E-orderplacing.spec.js:4:1

# Error details

```
Test timeout of 10000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e5]:
    - link "ProtoCommerce" [ref=e6] [cursor=pointer]:
      - /url: "#"
    - list [ref=e7]:
      - listitem [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: /angularpractice
      - listitem [ref=e10]:
        - link "Shop" [ref=e11] [cursor=pointer]:
          - /url: /angularpractice/shop
  - generic [ref=e12]:
    - navigation [ref=e13]:
      - generic [ref=e14]:
        - link "ProtoCommerce Home" [ref=e15] [cursor=pointer]:
          - /url: "#"
        - list [ref=e17]:
          - listitem [ref=e18]:
            - generic [ref=e19] [cursor=pointer]:
              - text: Checkout ( 2 )
              - generic [ref=e20]: (current)
    - generic [ref=e22]:
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]:
            - text: Please choose your delivery location.
            - text: Then click on purchase button
          - textbox "Please choose your delivery location. Then click on purchase button" [ref=e26]: India
        - generic [ref=e27]:
          - checkbox "I agree with the term & Conditions " [checked] [ref=e28]
          - generic [ref=e29] [cursor=pointer]: I agree with the term & Conditions 
        - button "Purchase" [active] [ref=e31] [cursor=pointer]
      - generic [ref=e33]:
        - link "close" [ref=e34] [cursor=pointer]:
          - /url: "#"
          - text: ×
        - strong [ref=e35]: Success!
        - text: Thank you! Your order will be delivered in next few weeks :-).
    - contentinfo [ref=e36]:
      - paragraph [ref=e38]: Copyright © ProtoCommerce 2018
```