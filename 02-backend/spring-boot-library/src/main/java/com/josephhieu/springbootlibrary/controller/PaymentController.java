package com.josephhieu.springbootlibrary.controller;

import com.josephhieu.springbootlibrary.entity.Payment;
import com.josephhieu.springbootlibrary.requestmodels.PaymentInfoRequest;
import com.josephhieu.springbootlibrary.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/payment/secure")
public class PaymentController {

    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Tự thêm
    @GetMapping("/user")
    public ResponseEntity<Payment> getPaymentByUser(@AuthenticationPrincipal Jwt jwt) {
        String userEmail = jwt.getClaim("email");
        if (userEmail == null) {
            return ResponseEntity.badRequest().build();
        }

        Payment payment = paymentService.getPaymentByUserEmail(userEmail);
        if (payment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(payment);
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest)
            throws StripeException {

        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@AuthenticationPrincipal Jwt jwt)
        throws Exception {

        String userEmail = jwt.getClaim("email");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        return paymentService.stripePayment(userEmail);
    }
}
