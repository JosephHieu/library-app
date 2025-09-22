package com.josephhieu.springbootlibrary.service;

import com.josephhieu.springbootlibrary.dao.PaymentRepository;
import com.josephhieu.springbootlibrary.entity.Payment;
import com.josephhieu.springbootlibrary.requestmodels.PaymentInfoRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class PaymentService {

    private PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository, @Value("${stripe.key.secret}") String secretKey) {
        this.paymentRepository = paymentRepository;
        Stripe.apiKey = secretKey;
    }

    // Tự thêm
    public Payment getPaymentByUserEmail(String userEmail) {
        return paymentRepository.findByUserEmail(userEmail);
    }

    public PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException {

        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfoRequest.getAmount());
        params.put("currency", paymentInfoRequest.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);

        return PaymentIntent.create(params);
    }

    public ResponseEntity<String> stripePayment(String userEmail) throws Exception {

        Payment payment = paymentRepository.findByUserEmail(userEmail);

        if (payment == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Payment information is missing for user: " + userEmail);
        }
        payment.setAmount(00.00);
        paymentRepository.save(payment);
        return new ResponseEntity<>("Payment successfully for user: " + userEmail ,HttpStatus.OK);
    }


}
