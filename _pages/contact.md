---
title: "Contact"
layout: single
permalink: /contact/
author_profile: true
---

<div style="max-width: 600px; margin: 40px 0;">
  
  <p style="margin-bottom: 30px; color: #666;">If you have any questions or would like to get in touch, please fill out the form below.</p>

  <form action="https://formspree.io/f/你的ID" method="POST" style="display: flex; flex-direction: column; gap: 25px;">
    
    <div style="display: flex; flex-direction: column;">
      <label style="font-size: 0.9em; font-weight: bold; margin-bottom: 5px;">Full Name *</label>
      <input type="text" name="name" placeholder="Enter your name" required style="border:none; border-bottom: 1px solid #999; padding: 10px; background: transparent; outline: none; font-size: 1em;">
    </div>

    <div style="display: flex; flex-direction: column;">
      <label style="font-size: 0.9em; font-weight: bold; margin-bottom: 5px;">Email Address *</label>
      <input type="email" name="email" placeholder="Enter your email" required style="border:none; border-bottom: 1px solid #999; padding: 10px; background: transparent; outline: none; font-size: 1em;">
    </div>

    <div style="display: flex; flex-direction: column;">
      <label style="font-size: 0.9em; font-weight: bold; margin-bottom: 5px;">Subject</label>
      <input type="text" name="subject" placeholder="What is this about?" style="border:none; border-bottom: 1px solid #999; padding: 10px; background: transparent; outline: none; font-size: 1em;">
    </div>

    <div style="display: flex; flex-direction: column;">
      <label style="font-size: 0.9em; font-weight: bold; margin-bottom: 5px;">Message *</label>
      <textarea name="message" placeholder="Type your message here..." required rows="6" style="border:none; border-bottom: 1px solid #999; padding: 10px; background: transparent; outline: none; resize: vertical; font-size: 1em;"></textarea>
    </div>

    <button type="submit" style="background: #1a2a40; color: white; border: none; padding: 12px 30px; cursor: pointer; align-self: flex-start; font-weight: bold; transition: 0.3s; border-radius: 2px;">
      Send Message
    </button>
    
  </form>
</div>
